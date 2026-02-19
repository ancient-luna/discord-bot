const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, MediaGalleryBuilder, MessageFlags, TextDisplayBuilder } = require("discord.js");

let isProcessing = false;

module.exports = {
    name: "messageCreate",
    async execute(client, message) {
        if (message.author.id === client.user.id) return;
        const alertChannelId = client.config.dfAlertChannel;
        if (message.channel.id !== alertChannelId) return;

        const container = new ContainerBuilder();
        const banner = new MediaGalleryBuilder()
            .addItems([{
                type: 'image',
                media: {
                    url: 'https://i.imgur.com/8TdP6Kl.gif'
                }
            }]);
        const tips = new TextDisplayBuilder().setContent('-# <:al_levatio:1376685304005525585> Click on button to get the notifications')
        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('btn-dfbehemoth')
                .setLabel('Behemoth')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('btn-dfdevil')
                .setLabel('DH')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('btn-dfvolatile')
                .setLabel('VL')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('btn-dfoutpost')
                .setLabel('OAttack')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('btn-dfbandit')
                .setLabel('Bandit')
                .setStyle(ButtonStyle.Secondary)
        );

        container.addTextDisplayComponents(tips);
        container.addMediaGalleryComponents(banner);
        container.addActionRowComponents(button);

        if (isProcessing) return;
        isProcessing = true;

        try {
            const recentMessages = await message.channel.messages.fetch({ limit: 20 });
            const botMessages = recentMessages.filter(msg => msg.author.id === client.user.id);
            if (botMessages.size > 0) {
                await message.channel.bulkDelete(botMessages).catch(async () => {
                    for (const msg of botMessages.values()) {
                        await msg.delete().catch(() => { });
                    }
                });
            }
            await message.channel.send({
                flags: MessageFlags.IsComponentsV2,
                components: [container]
            });
        } catch (error) {
            console.error("Failed to handle sticky message:", error);
        } finally {
            isProcessing = false;
        }
    }
};
