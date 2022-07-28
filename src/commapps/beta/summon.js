const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('summon')
    .setDescription('call out my name, im yours to tame'),
    async execute(interaction, client) {
        
        let dewIT = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId("role-843661888670662656")
            .setStyle("PRIMARY")
            .setLabel("cunt")
        )
        
        await interaction.reply({
            content: 'select this shit now, just click it. i dare you',
            components: [dewIT]
        }).catch((e) => {});
    }
}