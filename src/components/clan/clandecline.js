const { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, ContainerBuilder, TextDisplayBuilder, MediaGalleryBuilder } = require("discord.js");

module.exports = {
    name: "clandecline",
    id: "btn-clandecline",
    permissions: {
        client: [],
        user: [],
        dev: false,
    },

    execute: async (client, interaction) => {
        const lunariaRole = client.config.lunariaRole;
        if (!interaction.member.roles.cache.has(lunariaRole)) {
            return await interaction.reply({
                content: `**No, you can't**\n-# Only the ** LUNARIA ** able to command me for this`,
                flags: MessageFlags.Ephemeral,
            });
        }

        const containerData = interaction.message.components[0];
        const containerComponents = containerData.components;

        const headerContent = containerComponents[0]?.data?.content || containerComponents[0]?.content || '';
        const userIdMatch = headerContent.match(/<@(\d+)>/);
        const applicantId = userIdMatch[1];

        const container = new ContainerBuilder();

        const statusText = new TextDisplayBuilder().setContent(`-# <:srv_deny:1334881089205829674> <@${applicantId}> got \`declined\` by **${interaction.user.displayName}**`);
        container.addTextDisplayComponents(statusText);

        if (containerComponents[1]?.data?.items || containerComponents[1]?.items) {
            const items = containerComponents[1].data?.items || containerComponents[1].items;
            const mediaGallery = new MediaGalleryBuilder().addItems(items.map(item => ({
                media: { url: item.media?.url || item.media?.proxy_url }
            })));
            container.addMediaGalleryComponents(mediaGallery);
        }

        const originalButtons = containerComponents[4]?.components || [];
        const newButtons = new ActionRowBuilder();

        for (const btn of originalButtons) {
            const btnData = btn.data || btn;
            if (btnData.style === ButtonStyle.Link || btnData.style === 5) {
                newButtons.addComponents(
                    new ButtonBuilder()
                        .setLabel(btnData.label)
                        .setURL(btnData.url)
                        .setStyle(ButtonStyle.Link)
                );
            } else {
                newButtons.addComponents(
                    new ButtonBuilder()
                        .setCustomId(btnData.custom_id || btnData.customId)
                        .setLabel(btnData.label)
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true)
                );
            }
        }

        container.addActionRowComponents(newButtons);

        const reapplyText = new TextDisplayBuilder().setContent(`-# You can reapply in <#1461250404640620586>`);

        await interaction.update({
            flags: MessageFlags.IsComponentsV2,
            components: [container, reapplyText],
            allowedMentions: { parse: [] },
        });
    },
};