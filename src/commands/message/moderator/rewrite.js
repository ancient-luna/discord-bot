const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
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
        const msgID = args[1];
        const cntntQ = args.slice(2).join(" ");

        if (!chID) return message.reply("`channelid` `messageid` `reason`").catch((e) => { });
        if (!msgID) return message.reply("`messageid` `reason`").catch((e) => { });
        if (!cntntQ) return message.reply("set `reason`").catch((e) => { });

        try {
            const channelID = message.guild.channels.cache.get(chID);

            const messageID = await channelID.messages.fetch(msgID);

            // let newFile = new AttachmentBuilder("src/assets/df/thecallers.gif")

            const editEmbed = new EmbedBuilder()
                // .setTitle('EXCLUSIVE ROLES')
                .setDescription(cntntQ)
                .setColor(client.config.embedColorTrans)
                // .setImage('https://i.imgur.com/tRx8iKL.png')
                // .setFooter({ text: `*this is world boss alerts (ASIA region only) GMT+8` })

            // const editButton = new ActionRowBuilder()
            // .addComponents(
            //     new ButtonBuilder()
            //     .setCustomId("btn-ticketopen")
            //     .setLabel("Open a Ticket")
            //     .setStyle(ButtonStyle.Primary)
            // )

            message.channel.send("Embed: **EDITED** ! `updated`").catch((e) => { });
            messageID.edit({
                embeds: [editEmbed],
                // components: [editButton],
                // files: [newFile]
            });

        } catch (err) {
            console.log(err);
            message.channel.send(`That embed ID doesn't exist.`).catch((e) => { });
        }
    }
});