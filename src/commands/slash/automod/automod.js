const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'automod',
    description: 'Setup automod system',
    options: [
        {
            name: 'spammessages',
            description: 'Setup spam messages auto moderation',
            type: 1
        },
        {
            name: 'spammentions',
            description: 'Setup spam mentions auto moderation',
            type: 1,
            options: [
                {
                    name: 'number',
                    description: 'Number of mentions trigger auto moderation',
                    type: 4,
                    required: true
                }
            ]
        },
        {
            name: 'keywords',
            description: 'Setup keyword auto moderation',
            type: 1,
            options: [
                {
                    name: 'word',
                    description: 'Keyword to moderate',
                    type: 3,
                    required: true
                }
            ]
        },
        {
            name: 'flaggedwords',
            description: 'Setup flagged words auto moderation',
            type: 1
        }
    ],
    cooldown: 5, // cooldown in seconds
    permissions: ['ADMINISTRATOR'],

    /**
     * @param {import('../index')} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        // Get the chosen subcommand
        const subcommand = interaction.options.getSubcommand();

        // Handle each subcommand accordingly
        switch (subcommand) {
            case 'spammessages':
                await handleAutomodSpamMessages(client, interaction);
                break;
            case 'spammentions':
                await handleAutomodSpamMentions(client, interaction);
                break;
            case 'keywords':
                await handleAutomodKeywords(client, interaction);
                break;
            case 'flaggedwords':
                await handleAutomodFlaggedWords(client, interaction);
                break;
            default:
                await interaction.reply('Invalid subcommand.');
                break;
        }
    }
};

async function handleAutomodSpamMessages(client, interaction) {
    const { guild } = interaction;

    await interaction.reply(`<a:_util_loading:863317596551118858> Loading the spam messages automod rule...`);

    const rule = await guild.autoModerationRules.create({
        name: `Prevent spam messages by Ancient Luna`,
        creatorId: '793482727223590922',
        enabled: true,
        eventType: 1,
        triggerType: 3,
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
        console.error(err);
        await interaction.editReply(`❌ An error occurred while creating the automod rule: ${err}`);
        return null;
    });

    if (!rule) return;

    setTimeout(async () => {
        const embed = new MessageEmbed()
            .setColor(client.config.embedColorTrans)
            .setDescription(`<:vcon_vote_accepted:859075138329903114> Automod rule created\nAll messages suspected of spam will be deleted by **Ancient Luna**`);
        await interaction.editReply({ content: '', embeds: [embed] });
    }, 3000);
}

async function handleAutomodSpamMentions(client, interaction) {
    const { guild, options } = interaction;
    const number = options.getInteger('number');

    await interaction.reply(`<a:_util_loading:863317596551118858> Loading the spam mentions automod rule...`);

    const rule = await guild.autoModerationRules.create({
        name: `Prevent spam mentions by Ancient Luna`,
        creatorId: '793482727223590922',
        enabled: true,
        eventType: 1,
        triggerType: 5,
        triggerMetadata: {
            mentionTotalLimit: number
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
        console.error(err);
        await interaction.editReply(`❌ An error occurred while creating the automod rule: ${err}`);
        return null;
    });

    if (!rule) return;

    setTimeout(async () => {
        const embed = new MessageEmbed()
            .setColor(client.config.embedColorTrans)
            .setDescription(`<:vcon_vote_accepted:859075138329903114> Automod rule created\nAll messages suspected of mention spam will be deleted by **Ancient Luna**`);
        await interaction.editReply({ content: '', embeds: [embed] });
    }, 3000);
}

async function handleAutomodKeywords(client, interaction) {
    const { guild, options } = interaction;
    const word = options.getString('word');

    await interaction.reply(`<a:_util_loading:863317596551118858> Loading the keyword automod rule...`);

    const rule = await guild.autoModerationRules.create({
        name: `Prevent the word ${word} from being used by Ancient Luna`,
        creatorId: '793482727223590922',
        enabled: true,
        eventType: 1,
        triggerType: 1,
        triggerMetadata: {
            keywordFilter: [word]
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
        console.error(err);
        await interaction.editReply(`❌ An error occurred while creating the automod rule: ${err}`);
        return null;
    });

    if (!rule) return;

    setTimeout(async () => {
        const embed = new MessageEmbed()
            .setColor(client.config.embedColorTrans)
            .setDescription(`<:vcon_vote_accepted:859075138329903114> Automod rule created\nAll messages containing the word \`${word}\` will be deleted by **Ancient Luna**`);
        await interaction.editReply({ content: '', embeds: [embed] });
    }, 3000);
}

async function handleAutomodFlaggedWords(client, interaction) {
    const { guild } = interaction;

    await interaction.reply(`<a:_util_loading:863317596551118858> Loading the flagged words automod rule...`);

    const rule = await guild.autoModerationRules.create({
        name: `Block profanity, sexual content, and slurs by Ancient Luna`,
        creatorId: '793482727223590922',
        enabled: true,
        eventType: 1,
        triggerType: 4,
        triggerMetadata: {
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
        console.error(err);
        await interaction.editReply(`❌ An error occurred while creating the automod rule: ${err}`);
        return null;
    });

    if (!rule) return;

    setTimeout(async () => {
        const embed = new MessageEmbed()
            .setColor(client.config.embedColorTrans)
            .setDescription(`<:vcon_vote_accepted:859075138329903114> Automod rule created\nAll swears will be stopped by **Ancient Luna**`);
        await interaction.editReply({ content: '', embeds: [embed] });
    }, 3000);
}