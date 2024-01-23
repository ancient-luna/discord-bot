const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = new Object({
    name: "wisdomoflleud",
    description: "wisdomoflleud.",
    category: "Entertainment",
    cooldown: 0,
    usage: "",
    aliases: ['help', 'about'],
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

        const cB = `\`\`\``

        const descGeneral = new EmbedBuilder()
            .setTitle(`About Ancient Luna Bot`)
            .setDescription(`우리는 마치 달을 만난 것처럼 달렸다\nI'm a relic that born by [@imsoondae](https://www.instagram.com/everylttlething/) to seek wisdom\nBlessed by [@biglebomb](https://discordapp.com/users/306545868054593537) to be alive while until now`)
            .addFields(
                { name: `Prefix`, value: `${cB}!${cB}`, inline: true },
                { name: `Help (Prefix)`, value: `${cB}!help${cB}`, inline: true },
                { name: `Help (Mention)`, value: `${cB}@AncientLuna${cB}`, inline: true },
            )
            .setColor("2b2d31")
            .setImage("https://i.imgur.com/c8QnpbX.gif")

        let serverButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId("btn-helpcmd")
                .setLabel("Commands")
                .setStyle(ButtonStyle.Primary)
            )
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Server')
                    .setURL('https://discord.com/invite/Sbp2nt8QHe')
            )
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Support')
                    .setURL('https://ko-fi.com/daekid')
            )
            .addComponents(
                new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel('YouTube')
                .setURL('https://www.youtube.com/@ancientluna')
            )

        message.reply({
            embeds: [descGeneral],
            components: [serverButton]
        })
    }
});