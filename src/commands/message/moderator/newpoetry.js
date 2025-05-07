const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
module.exports = new Object({
    name: "newpoetry",
    description: "writing new embed",
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
        const poet = args.join(" ");

        if (!poet) return message.reply("go write the poet");

        const poetry = new EmbedBuilder()
            .setDescription(poet)
            .setColor(client.config.embedColorTrans)

        const memoir = new AttachmentBuilder('src/assets/bdo/ancientluna-tag.png')

        const ink = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("btn-guildtagpc")
                    .setLabel("Computer")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("btn-guildtagmobile")
                    .setLabel("Mobile")
                    .setEmoji('<:ico_write:1334864388942856212>')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("btn-guildtaglink")
                    .setLabel("Get Invitation Link")
                    .setEmoji('<:ico_write:1334864388942856212>')
                    .setStyle(ButtonStyle.Primary),
            )

        await message.channel.send({
            content: poet,
            // embeds: [poetry],
            // files: [memoir],
            components: [ink],
        });
    }
});