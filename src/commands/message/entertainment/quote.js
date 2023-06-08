const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
module.exports = new Object({
    name: "quote",
    description: "quote.",
    category: "Entertainment",
    usage: "",
    cooldown: 0,
    aliases: ['inspireword'],
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
        const response = await axios.get('https://api.quotable.io/random');

        let advice = new EmbedBuilder()
            .setAuthor({ name: `Quote from ${response.data.author}` })
            .setDescription(`${response.data.content}`)
            .setColor("2b2d31")

        await message.reply({ embeds: [advice] }).catch((e) => { });
    }
});