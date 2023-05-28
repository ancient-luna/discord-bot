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

        let target = message.mentions.members.first();

        var errMessage = { content: "How can I give an advice when theres none. Mention one" };
        if (!target) {
            message.react("❓").catch((e) => { });

            return message.reply(errMessage).then((msg) => {
                setTimeout(() => msg.delete().catch((e) => { }), 5000);
            });
        }

        await message.react("🗒️").catch((e) => { });
        let advice = new EmbedBuilder()
            .setDescription(`**${target.user.username} might need this advice,**\n${response.data.slip.advice}`)
            .setColor("2b2d31")
        await message.reply({ embeds: [advice] }).catch((e) => { });
    }
});