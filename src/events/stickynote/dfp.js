const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, MediaGalleryBuilder, MessageFlags } = require("discord.js");

module.exports = {
    name: "messageCreate",
    async execute(client, message) {
        if (message.author.id === client.user.id) return;
        const alertChannelId = client.config.dfAlertChannel;
        if (message.channel.id !== alertChannelId) return;

        const container = new ContainerBuilder();
        const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large });
        const banner = new MediaGalleryBuilder()
            .addItems([{
                type: 'image',
                media: {
                    url: 'https://i.imgur.com/8TdP6Kl.gif'
                }
            }]);

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('btn-dfbehemoth')
                .setLabel('Behemoth')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('btn-dfdevil')
                .setLabel('DH')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('btn-dfvolatile')
                .setLabel('VL')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('btn-dfoutpost')
                .setLabel('OAttack')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('btn-dfbandit')
                .setLabel('Bandit')
                .setStyle(ButtonStyle.Danger)
        );

        container.addMediaGalleryComponents(banner);
        container.addSeparatorComponents(separator);
        container.addActionRowComponents(button);

        // Manage Sticky Message
        const stickyKey = `sticky_${alertChannelId}`;
        const lastStickyId = await client.db.get(stickyKey);

        if (lastStickyId) {
            try {
                const lastMessage = await message.channel.messages.fetch(lastStickyId).catch(() => null);
                if (lastMessage) {
                    await lastMessage.delete().catch(() => { });
                }
            } catch (error) {
                // Determine if error needs logging
            }
        }

        try {
            const sentMessage = await message.channel.send({
                flags: MessageFlags.IsComponentsV2,
                components: [container]
            });
            await client.db.set(stickyKey, sentMessage.id);
        } catch (error) {
            console.error("Failed to send sticky message:", error);
        }
    }
};
