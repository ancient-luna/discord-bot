const { EmbedBuilder } = require("discord.js");
const superagent = require("superagent");
const onlyEmoji = require("emoji-aware").onlyEmoji;
module.exports = new Object({
    name: "emoji",
    description: "combining two emojis just for fun and creating silly emojis",
    category: "general",
    usage: `emoji <emoji1> <emoji2>`,
    cooldown: 0,
    aliases: [],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: { client: [], user: [], dev: false, },
    player: { voice: false, active: false, dj: false, },
    /**
     * 
     * @param {import("../../../index")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {

        const emojiMix = `${args}`;
        if (!emojiMix)
            return message.reply("`Add two emojis` that wanted to mix");

        const input = onlyEmoji(emojiMix);
        const response = `\`One\` or \`both\` of these emojis ${emojiMix} are not supported.`

        const output = await superagent.get('https://tenor.googleapis.com/v2/featured').query({
            key: process.env.GOOGLE_API,
            contentfilter: 'high',
            media_filter: 'png_transparent',
            component: 'proactive',
            collection: 'emoji_kitchen_v5',
            q: input.join('_')
        }).catch(err => {});
        
        if (!output) {
            return await message.reply({ content: response });
        } else if (!output.body.results[0]) {
            return await message.reply({ content: response });
        } else if (emojiMix.startsWith('<') || emojiMix.endsWith('>')) {
            return await message.reply({ content: response });
        }

        await message.channel.send({ content: output.body.results[0].url })
    }
})