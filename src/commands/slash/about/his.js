const { MessageEmbed, CommandInteraction } = require('discord.js');

module.exports = {
    name: 'his',
    description: 'call out my name, im yours to tame',
    dir: 'about',
    cooldown: 1, // cooldown (seconds)
    permissions: [],

    /**
     * @param {import('../index')} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        interaction.reply({
            content: `𝕀𝕞 𝕥𝕠𝕥𝕒𝕝𝕝𝕪 ℍ𝕚𝕤 𝕥𝕠 𝕥𝕒𝕞𝕖`, 
            ephemeral: false,
        });
    },
};