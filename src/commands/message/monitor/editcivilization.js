const { EmbedBuilder } = require("discord.js");
module.exports = new Object({
    name: "editcivilization",
    description: "editcivilization.",
    category: "Setup",
    usage: "",
    cooldown: 0,
    aliases: [],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: ['ManageGuild'],
        user: ['ManageChannels'],
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
        const messageID = parseInt(args[0]);
        const editQuery = args.slice(1).join(" ");
        if (!messageID) return message.reply("`messageid` `reason`").catch((e) => { });
        if (!editQuery) return message.reply("`messageid` `reason`").catch((e) => { });

        const guideEmbed = await message.channel.messages.fetch(messageID);

        let embed = new EmbedBuilder()
            .setDescription(editQuery)
            .setColor(`#2b2d31`)
        message.channel.send("Civilizations: **EDITED** ! `updated`").catch((e) => { });
        return guideEmbed.edit({ embeds: [embed] }).catch((e) => { });
    }
});
