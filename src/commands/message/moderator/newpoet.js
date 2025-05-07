const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
module.exports = new Object({
    name: "newpoet",
    description: "writing new embed",
    category: "moderator",
    usage: "",
    cooldown: 0,
    aliases: ['embed'],
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
        const poet = args.join(" ");

        if (!poet) return message.reply("go write the poet");

        const poetry = new EmbedBuilder()
            .setDescription(poet)
            .setColor(client.config.embedColorTrans)

        const memoir = new AttachmentBuilder('src/assets/ancientluna-tag.png')

        const ink = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("btn-tagguildpc")
                    .setLabel("Computer")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("btn-tagguildmobile")
                    .setLabel("Mobile")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("btn-tagguildlink")
                    .setLabel("Get Invitation Link")
                    .setEmoji('<:ico_radiance:1334864373331787827>')
                    .setStyle(ButtonStyle.Primary),
            )

        await message.channel.send({
            content: poet,
            // embeds: [poetry],
            // files: [memoir],
            // components: [ink],
        });
    }
});