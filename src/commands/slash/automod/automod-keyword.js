const { MessageEmbed, CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'automod-keyword',
    description: 'setup automod system',
    dir: 'automod',
    cooldown: 5, // cooldown (seconds)
    permissions: ['ADMINISTRATOR'],
	options: [
        {
            name: 'word',
            description: 'input the words',
            type: 3,
            required: true,    
        },
	],

    /**
     *
     * @param {import('../index')} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const { guild, options } = interaction;
        await interaction.reply(`<a:_util_loading:863317596551118858> loading the automod rule`);
        const word = options.getString('word')
        const rule = await guild.autoModerationRules.create({
            name: `Prevent the word ${word} from being used by Ancient Luna`,
            creatorId: '793482727223590922',
            enabled: true,
            eventType: 1,
            triggerType: 1,
            triggerMetadata:
                {
                    keywordFilter: [`${word}`]
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
                .setColor(client.config.embedColorTrans)
                .setDescription(`<:vcon_vote_accepted:859075138329903114> You Automod rule has been created\nAll messages containing the word \`${word}\` will be deleted by **Ancient Luna**`)
            await interaction.editReply({ content: ``, embeds: [embed] });
        }, 3000)
    },
};