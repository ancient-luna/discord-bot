const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = new Object({
    name: "rewrite",
    description: "rewrite.",
    category: "Moderator",
    usage: "",
    cooldown: 0,
    aliases: ['editembed'],
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
        const messageID = args[1];
        const editQuery = args.slice(2).join(" ");

        if (!chID) return message.reply("`channelid` `messageid` `reason`").catch((e) => { });
        if (!messageID) return message.reply("`messageid` `reason`").catch((e) => { });
        if (!editQuery) return message.reply("set `reason`").catch((e) => { });

        try {
            const channelID = message.guild.channels.cache.get(chID);

            const theEmbed = await channelID.messages.fetch(messageID);
            const editEmbed = new EmbedBuilder()
                .setDescription(editQuery)
                .setColor(`2b2d31`)

            // const editButton = new ActionRowBuilder()
            // .addComponents(
            //     new ButtonBuilder()
            //     .setCustomId("btn-ticketopen")
            //     .setLabel("Open a Ticket")
            //     .setStyle(ButtonStyle.Primary)
            // )

            message.channel.send("Embed: **EDITED** ! `updated`").catch((e) => { });
            theEmbed.edit({
                embeds: [editEmbed],
                // components: [editButton]
            });

        } catch (err) {
            console.log(err);
            message.channel.send(`That embed ID doesn't exist.`).catch((e) => { });
        }
    }
});
