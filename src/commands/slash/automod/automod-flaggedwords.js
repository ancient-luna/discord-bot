const { MessageEmbed, CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'automod-flaggedwords',
    description: 'setup automod system',
    dir: 'automod',
    cooldown: 5, // cooldown (seconds)
    permissions: ['ADMINISTRATOR'],

    /**
     *
     * @param {import('../index')} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const { guild } = interaction;
        await interaction.reply(`<a:_util_loading:863317596551118858> loading the automod rule`);
        const rule = await guild.autoModerationRules.create({
            name: `Block profanity, sexual content, and slury by Ancient Luna`,
            creatorId: '793482727223590922',
            enabled: true,
            eventType: 1,
            triggerType: 4,
            triggerMetadata:
                {
                    presets: [1, 2, 3]
                },
            actions: [
                {
                    type: 1,
                    metadata: {
                        channel: interaction.channel,
                        durationSeconds: 10,
                        customMessage: 'This message was prevented by Ancient Luna auto moderation'
                    }
                }
            ]
        }).catch(async err => {
            setTimeout(async ()=> {
                console.log(err);
                await interaction.editReply({ content: `${err} `});
            }, 2000)
        })
        setTimeout(async ()=> {
            if (!rule) return;
            const embed = new EmbedBuilder()
                .setColor('2b2d31')
                .setDescription(`<:vcon_vote_accepted:859075138329903114> You Automod rule has been created\nAll swears will be stopped by **Ancient Luna**`)
            await interaction.editReply({ content: ``, embeds: [embed] });
        }, 3000)
    },
};