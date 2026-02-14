const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, MediaGalleryBuilder, MessageFlags, TextDisplayBuilder } = require("discord.js");

let isProcessing = false;

module.exports = {
    name: "messageCreate",
    async execute(client, message) {
        if (message.author.id === client.user.id) return;
        const giveawayChannels = {
            hato: client.config.hatoGiveawayChannel,
            bdo: client.config.bdoGiveawayChannel,
            df: client.config.dfGiveawayChannel,
            general: client.config.generalGiveawayChannel
        };

        const channelIds = Object.values(giveawayChannels);
        if (!channelIds.includes(message.channel.id)) return;

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
            const randomEmoji = ["<:luna_heart_love:1461723752827064527>", "<:luna_silly_smile:1461723584211976324>", "<:luna_flower:1461722834534531178>", "<:luna_vote_yes:1461723857600909448>", "<:luna_cool_glasses:1461723408441151806>"];
            await message.channel.send({
                content: `-# Join <#1462709474035765248> for $10 steam wallet & heartopia membership (x2) winner ${randomEmoji[Math.floor(Math.random() * randomEmoji.length)]}`,
            });
        } catch (error) {
            console.error("Failed to handle sticky message:", error);
        } finally {
            isProcessing = false;
        }
    }
};