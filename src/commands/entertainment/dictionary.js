const { MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports.run = async (client, message, args) => {
    let query = args.join(" ");
    if (!query) return message.channel.send("By the moonlight, what you seeks for?");

    let link = "https://api.urbandictionary.com/v0/define?term="
    let fetch = await axios(link + encodeURI(query));
    fetch = fetch.data.list;

    if (fetch.length === 0) {
        return message.channel.send("My knowledge can't define the word further, try seek another wisdom")
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

    const embed = new MessageEmbed()
        .setTitle(title)
        .setURL(permalink)
        .setColor(`2f3136`)
        .addField("Definition: ", definition)
        .addField("Example: ", example)
        .setFooter(`rating 👍 ${thumbsUp} 👎 ${thumbsDown}`)

    return message.channel.send(embed)
}

module.exports.help = {
    name: 'dictionary'
}
