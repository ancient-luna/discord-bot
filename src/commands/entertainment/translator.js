const { MessageEmbed } = require("discord.js");
const translate = require("@iamtraction/google-translate");

module.exports.run = async (client, message, args) => {
    const translateQuery = args.join(" ");
    if (!translateQuery) return message.reply("Please specify a text to translate.");
    const translated = await translate(translateQuery, { to: 'en' });
    const embed = new MessageEmbed()
        .setDescription(`**EN**: ${translated.text}`)
        .setColor(`7289da`);
    message.channel.send(embed);
}

module.exports.help = {
    name: 'translate'
}