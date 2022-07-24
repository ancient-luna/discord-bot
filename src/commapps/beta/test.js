const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('SLASH command desc'),
    async execute(interaction, client) {
        await interaction.reply({ content: 'Oceans & Engines - NIKI'})
    }
}