const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const axios = require('axios');

module.exports = new Object({
    name: "advice",
    description: "a total random advice",
    category: "general",
    usage: `${client.prefix}advice [@user]`,
    cooldown: 0,
    aliases: ['lifeadvice'],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
        user: [],
        dev: false,
    },
    player: { voice: false, active: false, dj: false, },
    /**
     * 
     * @param {import("../../../index")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {

        let user = message.mentions.members.first() || message.member;
        let tweet = await axios.get('https://api.adviceslip.com/advice');

        const randomReplies = Math.floor(Math.random() * 333);
        const randomRetweets = Math.floor(Math.random() * 666);

        const x = Math.floor(Math.random() * 9) + 1;
        const y = Math.floor(Math.random() * 9) + 1;
        const c = Math.random() < 0.5 ? 'M' : 'K';

        const randomLikes = `${x}.${y}${c}`;

        let avatarUrl = user.displayAvatarURL({ extension: "jpg" }) || 'https://cdn.discordapp.com/attachments/1080219392337522718/1093224716875087892/twitter.png';

        let canvas = `https://some-random-api.com/canvas/tweet?avatar=${avatarUrl}&displayname=${encodeURIComponent(user.displayName)}&username=${encodeURIComponent(user.user.username)}&comment=${encodeURIComponent(tweet.data.slip.advice)}&replies=${randomReplies}&retweets=${randomRetweets}&likes=${randomLikes}`;
        
        let advice = new EmbedBuilder()
            .setAuthor({ name: `𝔸𝕕𝕧𝕚𝕔𝕖 𝕠𝕗 𝕃𝕚𝕗𝕖`, iconURL: 'https://i.imgur.com/nF8zpsB.png' })
            .setColor(client.config.embedColorTrans)
            .setImage(canvas)

        await message.channel.send({ embeds: [advice] });
    }
});