const { EmbedBuilder } = require('discord.js');
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
        const response = await axios.get('https://api.adviceslip.com/advice');

        let advice = new EmbedBuilder()
            .setAuthor({ name: `${message.author.username} might need this advice 🗒️` })
            .setDescription(`${response.data.slip.advice}`)
            .setColor("2b2d31")
        await message.reply({ embeds: [advice] }).catch((e) => { });
    }
});