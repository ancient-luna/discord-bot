const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'whole Luna information that you might need to know',
    dir: 'about',
    cooldown: 1, // cooldown (seconds)
    permissions: [],

    /**
     * @param {import('../index')} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const cB = `\`\`\``

        const descGeneral = new EmbedBuilder()
            .setTitle(`About Ancient Luna Bot`)
            .setDescription(`우리는 마치 달을 만난 것처럼 달렸다\nI'm a relic that born by [@imsoondae](https://www.instagram.com/everylttlething/) to seek wisdom\nBlessed by [@biglebomb](https://discordapp.com/users/306545868054593537) to be alive while until now`)
            .addFields(
                { name: `Prefix`, value: `${cB}!${cB}`, inline: true },
                { name: `Help (Prefix)`, value: `${cB}!help${cB}`, inline: true },
                { name: `Help (Mention)`, value: `${cB}@AncientLuna${cB}`, inline: true },
            )
            .setColor(client.config.embedColorTrans)
            .setThumbnail("https://i.imgur.com/c8QnpbX.gif")

        let serverButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("btn-helpcmd")
                    .setLabel("Commands")
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Server')
                    .setURL('https://discord.com/invite/Sbp2nt8QHe'),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Support')
                    .setURL('https://ko-fi.com/daexx'),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('YouTube')
                    .setURL('https://www.youtube.com/@ancientluna')
            )
            
        interaction.reply({
            embeds: [descGeneral],
            components: [serverButton]
        });
    },
};