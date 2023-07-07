const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const axios = require('axios');

module.exports = new Object({
    name: "lifeadvice",
    description: "lifeadvice.",
    category: "Entertainment",
    usage: "",
    cooldown: 0,
    aliases: ['advice'],
    examples: [''],
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

        let user = message.mentions.members.first();
        let tweet = await axios.get('https://api.adviceslip.com/advice');

        // if (target.bot) return await message.reply({ content: "Well, it is a BOT. You cant track them" })

        if (!user) {
            message.react("❓").catch((e) => { });
            return message.reply({ content: "How can I tweet them. Mention one" }).then((msg) => {
                setTimeout(() => msg.delete().catch((e) => { }), 5000);
            });
        }

        let avatarUrl = user.displayAvatarURL({ extension: "jpg" }) || 'https://cdn.discordapp.com/attachments/1080219392337522718/1093224716875087892/twitter.png';

        let canvas = `https://some-random-api.com/canvas/tweet?avatar=${avatarUrl}&displayname=${encodeURIComponent(user.displayName)}&username=${encodeURIComponent(user.user.username)}&comment=${encodeURIComponent(tweet.data.slip.advice)}&replies=${Math.floor(Math.random() * 333)}&retweets=${Math.floor(Math.random() * 666)}`;

        const tags = ['#advice #livingtoday', '#feelingcool', '#be4lose #getgood #skillissue']

        let advice = new EmbedBuilder()
            .setAuthor({ name: `${tags[Math.floor(Math.random() * tags.length)]}`, iconURL: 'https://i.imgur.com/yUsOxlz.png' })
            .setColor("1da1f2")
            .setImage(canvas)

        // await message.react("<:util_social_twitter:859071787114430475>").catch((e) => { });

        await message.reply({
            // content: canvas,
            embeds: [advice]
        })
    }
});