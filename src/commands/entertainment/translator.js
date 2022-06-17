const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const translate = require("@iamtraction/google-translate");

module.exports.run = async (client, message, args) => {
    const translateQuery = args.join(" ");
    if (!translateQuery) return message.channel.send({ content: "Please specify a text to translate. Don't let it empty, like my heart." }).catch((e) => {});

    message.channel.send({content: "Translating <a:_util_loading:863317596551118858>"}).then(msg => {
        setTimeout(() => msg.delete(), 8000)
      });

    const translated = await translate(translateQuery, { to: 'en' });
    const embedEN = new MessageEmbed()
        .setDescription(`<:util_googletranslate:858727960693833739> **ENGLISH**\n\n**Translation**: ${translated.text}`)
        .setColor(`2f3136`)
        .setImage("https://i.imgur.com/77n1x09.png")
        .setFooter({ text: `Translation request by ${message.member.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

    const translatedRU = await translate(translateQuery, { to: 'ru' });
    const embedRU = new MessageEmbed()
        .setDescription(`<:util_googletranslate:858727960693833739> **RUSSIAN**\n\n**Translation**: ${translatedRU.text}`)
        .setColor(`2f3136`);

    const translatedID = await translate(translateQuery, { to: 'id' });
    const embedID = new MessageEmbed()
        .setDescription(`<:util_googletranslate:858727960693833739> **INDONESIAN**\n\n**Translation**: ${translatedID.text}`)
        .setColor(`2f3136`);

    const translatedTH = await translate(translateQuery, { to: 'th' });
    const embedTH = new MessageEmbed()
        .setDescription(`<:util_googletranslate:858727960693833739> **THAI**\n\n**Translation**: ${translatedTH.text}`)
        .setColor(`2f3136`);

    const translatedFR = await translate(translateQuery, { to: 'fr' });
    const embedFR = new MessageEmbed()
        .setDescription(`<:util_googletranslate:858727960693833739> **FRENCH**\n\n**Translation**: ${translatedFR.text}`)
        .setColor(`2f3136`);

    const translatedJA = await translate(translateQuery, { to: 'ja' });
    const embedJA = new MessageEmbed()
        .setDescription(`<:util_googletranslate:858727960693833739> **JAPANESE**\n\n**Translation**: ${translatedJA.text}`)
        .setColor(`2f3136`);

    const translatedKO = await translate(translateQuery, { to: 'ko' });
    const embedKO = new MessageEmbed()
        .setDescription(`<:util_googletranslate:858727960693833739> **KOREAN**\n\n**Translation**: ${translatedKO.text}`)
        .setColor(`2f3136`);

    const translatedTR = await translate(translateQuery, { to: 'tr' });
    const embedTR = new MessageEmbed()
        .setDescription(`<:util_googletranslate:858727960693833739> **TURKISH**\n\n**Translation**: ${translatedTR.text}`)
        .setColor(`2f3136`);

    const translatedAR = await translate(translateQuery, { to: 'ar' });
    const embedAR = new MessageEmbed()
        .setDescription(`<:util_googletranslate:858727960693833739> **ARABIC**\n\n**Translation**: ${translatedAR.text}`)
        .setColor(`2f3136`);

    const translatedHI = await translate(translateQuery, { to: 'hi' });
    const embedHI = new MessageEmbed()
        .setDescription(`<:util_googletranslate:858727960693833739> **HINDI**\n\n**Translation**: ${translatedHI.text}`)
        .setColor(`2f3136`);

    const translatedDE = await translate(translateQuery, { to: 'de' });
    const embedDE = new MessageEmbed()
        .setDescription(`<:util_googletranslate:858727960693833739> **GERMAN**\n\n**Translation**: ${translatedDE.text}`)
        .setColor(`2f3136`);

    const translatedMS = await translate(translateQuery, { to: 'ms' });
    const embedMS = new MessageEmbed()
        .setDescription(`<:util_googletranslate:858727960693833739> **MALAY**\n\n**Translation**: ${translatedMS.text}`)
        .setColor(`2f3136`);

    const translatedIT = await translate(translateQuery, { to: 'it' });
    const embedIT = new MessageEmbed()
        .setDescription(`<:util_googletranslate:858727960693833739> **ITALIAN**\n\n**Translation**: ${translatedIT.text}`)
        .setColor(`2f3136`);

    const translatedTL = await translate(translateQuery, { to: 'tl' });
    const embedTL = new MessageEmbed()
        .setDescription(`<:util_googletranslate:858727960693833739> **FILIPINO**\n\n**Translation**: ${translatedTL.text}`)
        .setColor(`2f3136`);

    const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('translator-menu')
                .setPlaceholder('Translate to ... ')
                .setDisabled('false')
                .addOptions([
                    {
                        value: 'russian',
                        label: 'Россия',
                        emoji: '🇷🇺'
                    },
                    {
                        value: 'indonesian',
                        label: 'Bahasa Indonesia',
                        emoji: '🇮🇩'
                    },
                    {
                        value: 'thailand',
                        label: 'ภาษาไทย',
                        emoji: '🇹🇭'
                    },
                    {
                        value: 'franch',
                        label: 'French',
                        emoji: '🇫🇷'
                    },
                    {
                        value: 'japanese',
                        label: '日本',
                        emoji: '🇯🇵'
                    },
                    {
                        value: 'korean',
                        label: '대한민국',
                        emoji: '🇰🇷'
                    },
                    {
                        value: 'turkey',
                        label: 'Türkçe',
                        emoji: '🇹🇷'
                    },
                    {
                        value: 'arabic',
                        label: 'عَرَبِيّ',
                        emoji: '🇦🇪'
                    },
                    {
                        value: 'hindi',
                        label: 'हिन्दी',
                        emoji: '🇮🇳'
                    },
                    {
                        value: 'german',
                        label: 'Deutsch',
                        emoji: '🇩🇪'
                    },
                    {
                        value: 'malaysian',
                        label: 'Malay',
                        emoji: '🇲🇾'
                    },
                    {
                        value: 'italian',
                        label: 'Italiano',
                        emoji: '🇮🇹'
                    },
                    {
                        value: 'tagalog',
                        label: 'Filipino',
                        emoji: '🇵🇭'
                    }
                ])
        )
    
    const filter = (interaction) => interaction.isSelectMenu() && interaction.user.id === message.author.id;

    const collector = message.channel.createMessageComponentCollector({ filter, max:'1' });
    
    collector.on("collect", async (collected) => {
        const value = collected.values[0];

        if(value === "russian" ){
            collected.reply({ embeds: [embedRU], ephemeral: true })
        }
        if(value === "indonesian" ){
            collected.reply({ embeds: [embedID], ephemeral: true })
        }
        if(value === "thailand" ){
            collected.reply({ embeds: [embedTH], ephemeral: true })
        }
        if(value === "franch" ){
            collected.reply({ embeds: [embedFR], ephemeral: true })
        }
        if(value === "japanese" ){
            collected.reply({ embeds: [embedJA], ephemeral: true })
        }
        if(value === "korean" ){
            collected.reply({ embeds: [embedKO], ephemeral: true })
        }
        if(value === "turkey" ){
            collected.reply({ embeds: [embedTR], ephemeral: true })
        }
        if(value === "arabic" ){
            collected.reply({ embeds: [embedAR], ephemeral: true })
        }
        if(value === "hindi" ){
            collected.reply({ embeds: [embedHI], ephemeral: true })
        }
        if(value === "german" ){
            collected.reply({ embeds: [embedDE], ephemeral: true })
        }
        if(value === "malaysian" ){
            collected.reply({ embeds: [embedMS], ephemeral: true })
        }
        if(value === "italian" ){
            collected.reply({ embeds: [embedIT], ephemeral: true })
        }
        if(value === "tagalog" ){
            collected.reply({ embeds: [embedTL], ephemeral: true })
        }
    })

    message.reply({
        embeds: [embedEN],
        components: [row]
    })
}

module.exports.help = {
    name: 'translate'
}
