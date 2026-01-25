const { ChannelType, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require("discord.js");

let nextBumpTimestamp = null;

module.exports = new Object({
    name: "messageCreate",
    async execute(client, message) {
        if (message.author.id === client.user.id) return;
        if (message.channel.type === ChannelType.DM) return;

        const bumpChannelID = client.config.bumpChannel;
        if (!bumpChannelID || message.channel.id !== bumpChannelID) return;

        // Disboard Check
        if (message.author.id === '302050872383242240') {
            const description = message.embeds?.[0]?.description || "";
            if (description.includes("Bump done!") || message.content.includes("Bump done!")) {
                nextBumpTimestamp = Date.now() + 7200000; // 2 hours in ms
            }
        }

        const randomText = ['Alright seekers,', 'Better be ready!', 'By the moon name-'];
        let content = `<:ic_repost:1334863701026541648> ${randomText[Math.floor(Math.random() * randomText.length)]} do </bump:947088344167366698> to level up this server`;

        if (nextBumpTimestamp && nextBumpTimestamp > Date.now()) {
            content += ` <t:${Math.floor(nextBumpTimestamp / 1000)}:R>`;
        }

        const container = new ContainerBuilder();
        const text = new TextDisplayBuilder().setContent(content);
        container.addTextDisplayComponents(text);

        try {
            const messages = await message.channel.messages.fetch({ limit: 10 });
            const lastStickyMessage = messages.find(m => m.author.id === client.user.id);

            if (lastStickyMessage) {
                await lastStickyMessage.delete().catch(() => { });
            }

            await message.channel.send({ flags: MessageFlags.IsComponentsV2, components: [container] });

        } catch (error) {
            console.error("Error regarding sticky message:", error);
        }
    },
});
