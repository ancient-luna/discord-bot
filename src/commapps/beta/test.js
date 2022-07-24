const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('jsut call my name im yours to tame'),
    async execute(interaction, client) {
        await interaction.reply({ content: 'https://open.spotify.com/track/58HvfVOeJY7lUuCqF0m3ly?si=8197fa2e6edb45b4'})
    }
}