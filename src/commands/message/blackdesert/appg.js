
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require("discord.js");
module.exports = new Object({
    name: "appg",
    description: "appg.",
    category: "Blackdesert",
    usage: "",
    cooldown: 0,
    aliases: [''],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
        user: [],
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

        const embedApp = new EmbedBuilder()
            .setAuthor({ name: "Ancient Luna Guild Application", iconURL: "https://i.imgur.com/SOCuup9.png" })
            .setDescription(`It never leaves. It's always there, watching, steadfast, knowing us in our light and dark moments, changing forever as we do. Every day it's a different version of itself. Sometimes weak and wan, sometimes strong and full of lights.`)
            .setColor("2b2d31")
            .setImage("https://i.imgur.com/zO7pdYW.png")

        const btnGApp = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("btn-guildapplication")
            .setLabel("Apply for Guild")
            .setStyle(ButtonStyle.Primary)
        );

        message.channel.send({
            embeds: [embedApp],
            components: [btnGApp]
        })
    }
})
