const { MessageEmbed, CommandInteraction } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Shows bot ping!',
    dir: 'fun',
    cooldown: 1, // cooldown (detik)
    permissions: [],

    /**
     *
     * @param {import('../index')} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        interaction.reply("Hello World! Pong!");
    },
};