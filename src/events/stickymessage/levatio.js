const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, MediaGalleryBuilder, MessageFlags, TextDisplayBuilder, SectionBuilder } = require("discord.js");

let isProcessing = false;

module.exports = {
    name: "messageCreate",
    async execute(client, message) {
        if (message.author.id === client.user.id) return;
        const clanChannelID = client.config.dfClanChannel;
        if (message.channel.id !== clanChannelID) return;

        const container = new ContainerBuilder();
        const tips = new TextDisplayBuilder().setContent('-# <:al_levatio:1376685304005525585> Be a part of the Levatio')
        const section = new SectionBuilder()
            .addTextDisplayComponents(tips)
            .setButtonAccessory(button => button
                .setCustomId('btn-clanform')
                .setLabel('Apply')
                .setStyle(ButtonStyle.Primary)
            )

        container.addSectionComponents(section);

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
                components: [section],
                allowedMentions: { parse: [] }
            });
        } catch (error) {
            console.error("Failed to handle sticky message:", error);
        } finally {
            isProcessing = false;
        }
    }
};
