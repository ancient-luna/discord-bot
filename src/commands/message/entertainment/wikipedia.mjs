import fetch
 from "node-fetch";
const { EmbedBuilder } = require("discord.js");
module.exports = new Object({
    name: "wikipedia",
    description: "wikipedia.",
    category: "Entertainment",
    usage: "",
    cooldown: 0,
    aliases: ['wiki'],
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
        const wiki = args.join(" ");
        if (!wiki) return message.reply("By the moonlight, what you seeks for?").catch((e) => { });

        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}`

        let response
        try {
            response = await fetch(url).then(res => res.json())
        }
        catch (e) {
            return message.reply('Something hit my head and make it error..')
        }

        try {
            if (response.type === 'disambiguation') {
                const embed = new EmbedBuilder()
                    .setTitle(response.title)
                    .setURL(response.content_urls.desktop.page)
                    .setDescription([`\n${response.extract}\n[Links for topic you searched](${response.content_urls.desktop.page})`])
                    .setColor(`2b2d31`)
                    .setFooter({ text: `Wikipedia`, iconURL: 'https://i.imgur.com/OX1OJcd.png' })
                message.reply({ embeds: [embed] }).catch((e) => { });
            }
            else {
                const embed = new EmbedBuilder()
                    .setTitle(response.title)
                    .setURL(response.content_urls.desktop.page)
                    .setThumbnail(response.thumbnail.source)
                    .setDescription(response.extract)
                    .setColor(`2b2d31`)
                    .setFooter({ text: `Wikipedia`, iconURL: 'https://i.imgur.com/OX1OJcd.png' })
                message.reply({ embeds: [embed] }).catch((e) => { });
            }
        }
        catch {
            return message.reply("My knowledge can't define the word further, try seek another wisdom")
        }
    }
});



