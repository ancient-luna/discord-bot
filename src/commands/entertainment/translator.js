const { MessageEmbed } = require("discord.js");
const translate = require("@iamtraction/google-translate");
const pagination = require("discord.js-pagination");


module.exports.run = async (client, message, args) => {
    const translateQuery = args.join(" ");
    if (!translateQuery) return message.reply("Please specify a text to translate.");

    const translated = await translate(translateQuery, { to: 'en' });
    const embedEN = new MessageEmbed()
        .setDescription(`<:util_googletranslate:858727960693833739> **ENGLISH**\n\n**Translation**: ${translated.text}`)
        .setColor(`2f3136`);

    const translatedRU = await translate(translateQuery, { to: 'ru' });
    const embedRU = new MessageEmbed()
        .setDescription(`**RU**: ${translatedRU.text}`)
        .setColor(`2f3136`);

    const translatedID = await translate(translateQuery, { to: 'id' });
    const embedID = new MessageEmbed()
        .setDescription(`**ID**: ${translatedID.text}`)
        .setColor(`2f3136`);

    const translatedTH = await translate(translateQuery, { to: 'th' });
    const embedTH = new MessageEmbed()
        .setDescription(`**TH**: ${translatedTH.text}`)
        .setColor(`2f3136`);

    const translatedFR = await translate(translateQuery, { to: 'fr' });
    const embedFR = new MessageEmbed()
        .setDescription(`**FR**: ${translatedFR.text}`)
        .setColor(`2f3136`);

    const translatedJA = await translate(translateQuery, { to: 'ja' });
    const embedJA = new MessageEmbed()
        .setDescription(`**JP**: ${translatedJA.text}`)
        .setColor(`2f3136`);

    const translatedKO = await translate(translateQuery, { to: 'ko' });
    const embedKO = new MessageEmbed()
        .setDescription(`**KR**: ${translatedKO.text}`)
        .setColor(`2f3136`);
    
    const translatedTR = await translate(translateQuery, { to: 'tr' });
    const embedTR = new MessageEmbed()
        .setDescription(`**TR**: ${translatedTR.text}`)
        .setColor(`2f3136`);

    const translatedAR = await translate(translateQuery, { to: 'ar' });
    const embedAR = new MessageEmbed()
        .setDescription(`**AR**: ${translatedAR.text}`)
        .setColor(`2f3136`);

    const translatedHI = await translate(translateQuery, { to: 'hi' });
    const embedHI = new MessageEmbed()
        .setDescription(`**IN**: ${translatedHI.text}`)
        .setColor(`2f3136`);

    const translatedDE = await translate(translateQuery, { to: 'de' });
    const embedDE = new MessageEmbed()
        .setDescription(`**DE**: ${translatedDE.text}`)
        .setColor(`2f3136`);

    const translatedMS = await translate(translateQuery, { to: 'ms' });
    const embedMS = new MessageEmbed()
        .setDescription(`**MY**: ${translatedMS.text}`)
        .setColor(`2f3136`);

    const translatedIT = await translate(translateQuery, { to: 'it' });
    const embedIT = new MessageEmbed()
        .setDescription(`**IT**: ${translatedIT.text}`)
        .setColor(`2f3136`);

    const translatedTL = await translate(translateQuery, { to: 'tl' });
    const embedTL = new MessageEmbed()
        .setDescription(`**PH**: ${translatedTL.text}`)
        .setColor(`2f3136`);
    
    const pages = [
        embedEN,
        embedJA,
        embedKO,
        embedFR,
        embedIT,
        embedDE,
        embedRU,
        embedTR,
        embedTH,
        embedID,
        embedMS,
        embedTL,
        embedHI,
        embedAR
    ]

    const reaction = ["◀️", "▶️"]

    pagination(message, pages, reaction)
}

module.exports.help = {
    name: 'translate'
}
