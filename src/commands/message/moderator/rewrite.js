const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
module.exports = new Object({
    name: "rewrite",
    description: "editting embeds",
    category: "moderator",
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

        if (!chID) return message.reply("missing `channelid` `messageid` `reason`");
        if (!msgID) return message.reply("missing `messageid` `reason`");
        if (!cntntQ) return message.reply("missing `reason`");

        try {
            const channelID = message.guild.channels.cache.get(chID);

            const messageID = await channelID.messages.fetch(msgID);

            const editEmbed = new EmbedBuilder()
                .setDescription(cntntQ)
                .setColor(client.config.embedColorTrans)
                // .setImage('https://i.imgur.com/0KWUGuk.png') // radiance
                // .setImage('https://i.imgur.com/zO7pdYW.png') // guild

            // const editImage = new AttachmentBuilder('src/assets/bdo/civilizationclasses.png')

            const editButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("btn-ticketopen")
                        .setLabel("Open Ticket")
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId("btn-confession")
                        .setLabel("Write Confession")
                        .setEmoji('<:write:1163568311716565154>')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel(`Get Guild Tag`)
                        .setURL(`https://discord.gg/XJCtfTPBfu`),
                    // new ButtonBuilder()
                    //     .setStyle(ButtonStyle.Link)
                    //     .setLabel(`Support (Trakteer)`)
                    //     .setURL(`https://trakteer.id/daexx`)
                )

            message.channel.send("Embed: **EDITED** ! `updated`");
            messageID.edit({
                embeds: [editEmbed],
                // files: [editImage],
                components: [editButton],
            });

        } catch (err) {
            console.log(err);
            message.channel.send(`That \`embed ID\` doesn't exist.`);
        }
    }
});