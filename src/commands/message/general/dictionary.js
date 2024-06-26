const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
module.exports = new Object({
    name: "dictionary",
    description: "dictionary.",
    category: "Entertainment",
    usage: "",
    cooldown: 0,
    aliases: ['whatis', 'urban', 'meaning', 'meaningof'],
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

        let query = args.join(" ");
        if (!query) return message.reply("By the moonlight, what you seeks for?").catch((e) => { });

        let link = "https://api.urbandictionary.com/v0/define?term="
        let fetch = await axios(link + encodeURI(query));
        fetch = fetch.data.list;

        if (fetch.length === 0) {
            return message.reply("My knowledge can't define the word further, try seek another wisdom").catch((e) => { });
        }

        let data = fetch[0]
        let definition = data.definition
        let example = data.example
        let permalink = data.permalink
        let thumbsUp = data.thumbs_up
        let thumbsDown = data.thumbs_down
        let title = data.word

        definition = definition.length >= 1024 ? definition.slice(0, 1020) + "..." : definition;
        example = example.length >= 1024 ? example.slice(0, 1020) + "..." : example;

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setURL(permalink)
            .setColor(client.config.embedColorTrans)
            .addFields(
                { name: "Definition: ", value: definition },
                { name: "Example: ", value: example }
            )
            .setFooter({ text: `rating ↑ ${thumbsUp} ↓ ${thumbsDown}` })

        return message.reply({ embeds: [embed] }).catch((e) => { });
    }
})