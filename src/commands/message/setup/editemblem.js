const { EmbedBuilder } = require("discord.js");
module.exports = new Object({
    name: "editemblem",
    description: "editemblem.",
    category: "Setup",
    usage: "",
    cooldown: 0,
    aliases: ['ee'],
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
        const messageID = args[0];
        const editQuery = args.slice(1).join(" ");

        if (!messageID) return message.reply("`messageid` `reason`").catch((e) => { });
        if (!editQuery) return message.reply("`messageid` `reason`").catch((e) => { });

        try {
            const emblemChannel = message.guild.channels.cache.get(
                "952170767947272303"
            );

            const guideEmbed = await emblemChannel.messages.fetch(messageID);
            const editEmbed = new EmbedBuilder()
                .setDescription(editQuery)
                .setColor(`#2b2d31`)

            message.channel.send("Emblems: **EDITED** ! `updated`").catch((e) => { });
            guideEmbed.edit({ embeds: [editEmbed] }).catch((e) => { });

        } catch (err) {
            console.log(err);
            message.channel.send(`That emblem embed id doesn't exist.`).catch((e) => { });
        }
    }
});
