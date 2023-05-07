const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const malScraper = require('mal-scraper');

module.exports.run = async (client, message, args) => {
    const search = `${args}`;
    if (!search)
        return message.reply("Please add the anime title that you're looking for").catch((e) => {});

    const loadingTxt = await message.reply(`<a:_util_loading:863317596551118858> Searching on MyAnimeList`);
        
    malScraper.getInfoFromName(search)
        .then((data) => {
            let malEmbed = new MessageEmbed()
                .setTitle(data.japaneseTitle)
                .setURL(data.url)
                .addFields(
                    { name: 'Premiered', value: `*${data.premiered}*`, inline: true },
                    { name: 'Broadcast', value: `*${data.broadcast}*`, inline: true },
                    { name: 'Genres', value: `*${data.genres}*`, inline: true },
                    { name: 'English Title', value: `*${data.englishTitle}*`, inline: true },
                    { name: 'Japanese Title', value: `*${data.japaneseTitle}*`, inline: true },
                    { name: 'Type', value: `*${data.type}*`, inline: true },
                    { name: 'Episodes', value: `*${data.episodes}*`, inline: true },
                    { name: 'Rating', value: `*${data.rating}*`, inline: true },
                    { name: 'Aired', value: `*${data.aired}*`, inline: true },
                    { name: 'Score', value: `*${data.score}*`, inline: true },
                    { name: 'Favorite', value: `*${data.favorites}*`, inline: true },
                    { name: 'Ranked', value: `*${data.ranked}*`, inline: true },
                    { name: 'Duration', value: `*${data.duration}*`, inline: true },
                    { name: 'Studios', value: `*${data.studios}*`, inline: true },
                    { name: 'Popularity', value: `*${data.popularity}*`, inline: true },
                    { name: 'Members', value: `*${data.members}*`, inline: true },
                    { name: 'Score Stats', value: `*${data.scoreStats}*`, inline: true },
                    { name: 'Source', value: `*${data.source}*`, inline: true },
                    { name: 'Synonyms', value: `*${data.synonyms}*`, inline: true },
                    { name: 'Status', value: `*${data.status}*`, inline: true },
                    { name: 'Identifier', value: `*${data.id}*`, inline: true }
                )
                .setImage(data.picture)
                .setColor("2b2d31")
                .setTimestamp()
                .setFooter({ text: `${message.member.displayName} searched for ${args}`.split(',').join(' '), iconURL: message.author.displayAvatarURL({ dynamic: true }) })

            let link = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle('LINK')
                        .setLabel(`${data.englishTitle}`)
                        .setURL(data.url)
                )

            loadingTxt.edit({
                content: '⁣',
                embeds: [malEmbed],
                components: [link]
            }).catch((e) => {});
        }).catch((e) => {});
}

module.exports.help = {
    name: 'anime',
    aliases: ['myanimelist']
}
