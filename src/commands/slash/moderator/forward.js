const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags, ChannelType, ContainerBuilder, TextDisplayBuilder, MediaGalleryBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forward')
        .setDescription('Forward a message to all members with a specific role via DM')
        .addStringOption(option => 
            option.setName('messageid')
                .setDescription('The ID of the message to forward')
                .setRequired(true))
        .addRoleOption(option => 
            option.setName('role')
                .setDescription('The role to forward the message to')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel where the message is (defaults to current channel)')
                .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(client, interaction) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const messageId = interaction.options.getString('messageid');
        const role = interaction.options.getRole('role');
        const targetChannel = interaction.options.getChannel('channel') || interaction.channel;

        try {
            // Check permissions for the target channel
            if (!targetChannel.viewable) {
                return interaction.editReply({ content: `I don't have permission to view ${targetChannel}.` });
            }

            const message = await targetChannel.messages.fetch(messageId);
            if (!message) return interaction.editReply({ content: "Message not found." });

            // Fetch members with smart retry
            if (interaction.guild.memberCount !== interaction.guild.members.cache.size) {
                try {
                    await interaction.guild.members.fetch();
                } catch (error) {
                    if (error.data && error.data.retry_after) {
                        const retryTime = error.data.retry_after * 1000 + 1000;
                        console.log(`Rate limited. Retrying member fetch in ${retryTime}ms <a:u_load:1334900265953923085>`);
                        await interaction.editReply({ content: `Shush! It whispers... Rate limited by Discord\n-# Waiting ${Math.ceil(retryTime/1000)}s to fetch member list <a:u_load:1334900265953923085>` });
                        await new Promise(resolve => setTimeout(resolve, retryTime));
                        try {
                            await interaction.guild.members.fetch();
                        } catch (retryError) {
                            console.error("Retry failed:", retryError);
                            await interaction.editReply({ content: "**By the moon!** Failed to fetch full member list after retry\n-# Proceeding with currently cached members. Some users might be missed." });
                        }
                    } else {
                        console.error("Failed to fetch members:", error);
                        await interaction.editReply({ content: "**Eclipsed by the moon!** Failed to fetch full member list\n-# Proceeding with currently cached members. Some users might be missed." });
                    }
                }
            }
            
            const targetRole = interaction.guild.roles.cache.get(role.id);
            if (!targetRole) {
                 return interaction.editReply({ content: "Role not found in cache of lleud" });
            }

            const members = targetRole.members.filter(m => !m.user.bot);
            if (members.size === 0) {
                return interaction.editReply({ content: `No human members found with the role <:ico_member:1369189422846967818> ${targetRole}` });
            }

            // Construct the Components
            const components = [];

            // 1. Text Content
            if (message.content) {
                const textDisplay = new TextDisplayBuilder().setContent(message.content);
                components.push(textDisplay);
            }

            // 2. Media/Attachments
            if (message.attachments.size > 0) {
                const mediaItems = [];
                message.attachments.forEach(attachment => {
                    let type = 'image';
                    if (attachment.contentType?.startsWith('video/')) {
                        type = 'video';
                    }
                    // Add to media items
                    mediaItems.push({
                        type: type,
                        media: {
                            url: attachment.url
                        }
                    });
                });

                if (mediaItems.length > 0) {
                    const container = new ContainerBuilder();
                    const mediaGallery = new MediaGalleryBuilder().addItems(mediaItems);
                    container.addMediaGalleryComponents(mediaGallery);
                    components.push(container);
                }
            }

            if (components.length === 0) {
                 return interaction.editReply({ content: "No history written, nothing to forward for the legacy <:ico_chat:1369210205321166858>" });
            }

            let sent = 0;
            let failed = 0;
            let closed = 0;

            await interaction.editReply({ content: `<:ico_chat:1369210205321166858> Starting forwarding <a:u_load:1334900265953923085>\n-# Found **${members.size}** seekers with role ${targetRole}` });

            for (const [id, member] of members) {
                try {
                    await member.send({
                        flags: MessageFlags.IsComponentsV2,
                        components: components
                    });
                    sent++;
                } catch (e) {
                    if (e.code === 50007) {
                        closed++;
                    } else {
                        console.error(`Failed to DM ${member.user.tag}:`, e);
                        failed++;
                    }
                }
                // Small delay to avoid rate limits
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            await interaction.editReply({ 
                content: `**Forwarding Complete**\n-# Sent: ${sent} Closed DMs: ${closed} Failed: ${failed}` 
            });

        } catch (error) {
            console.error("Error in forward command:", error);
            await interaction.editReply({ content: "You know, I'm just a living Relic, I can't do everything\n-# Things happened and failed. Go check console logs for details" });
        }
    }
};
