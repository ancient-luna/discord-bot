const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('summon')
    .setDescription('call out my name, im yours to tame'),
    async execute(interaction, client) {
        
        await interaction.reply({
            content: 'i summoned, wow!'
        }).catch((e) => {});
    }
}