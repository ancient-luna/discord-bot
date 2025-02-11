const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
module.exports = new Object({
    name: "redye",
    description: "recoloring embeds",
    category: "moderator",
    usage: "",
    cooldown: 0,
    aliases: [''],
    examples: [''],
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
        const chID = args[0];
        const msgID = args[1];

        if (!chID) return message.reply("missing `channelid` `messageid`");
        if (!msgID) return message.reply("missing `messageid`");

        const fetchData = await chID.messages.fetch(msgID);
        const data = fetchData.embeds[0];

        try {
            const channelID = message.guild.channels.cache.get(chID);
            const messageID = await channelID.messages.fetch(msgID);

            const editEmbed = new EmbedBuilder()
                .setDescription(data.description)
                .setColor(client.config.embedColorTrans)

            message.channel.send("Embed: **EDITED** ! `updated`");
            messageID.edit({
                embeds: [editEmbed]
            });

        } catch (err) {
            console.log(err);
            message.channel.send(`That \`embed ID\` doesn't exist.`);
        }
    }
});