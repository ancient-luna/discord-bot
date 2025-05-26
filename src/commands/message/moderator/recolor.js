const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
module.exports = new Object({
    name: "recolor",
    description: "recoloring embeds",
    category: "moderator",
    usage: `recolor <channelID> <messageID> <#HEX>`,
    cooldown: 0,
    aliases: [],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: {
        client: ['ManageGuild'],
        user: ['ManageMessages'],
        dev: false,
    },
    player: { voice: false, active: false, dj: false, },
    /**
     * 
     * @param {import("../../../index")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {
        const [chID, msgID, embedColor] = args;

        if (!chID || !msgID || !embedColor) return message.reply("**WRONG FORMAT**. Usage: `!recolor <channelID> <messageID> <#HEX>`");

        try {
            const targetChannel = message.guild.channels.cache.get(chID);
            const targetMessage = await targetChannel.messages.fetch(msgID);
            const originalEmbed = targetMessage.embeds[0];

            if (!originalEmbed) return message.reply("That message doesn't have an embed.");

            const newEmbed = EmbedBuilder.from(originalEmbed).setColor(embedColor);

            await targetMessage.edit({ embeds: [newEmbed] });

            message.channel.send("Embed: **EDITED** ! `updated`");
        } catch (err) {
            console.error(err);
            message.channel.send("That `embed ID` doesn't exist.");
        }
    }
});