const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const malScraper = require('mal-scraper');
module.exports = new Object({
    name: "anime",
    description: "searching anime based on MyAnimeList",
    category: "general",
    usage: "",
    cooldown: 0,
    aliases: ['myanimelist'],
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

        const search = `${args}`;
        if (!search)
            return message.reply("Please add the `anime title` that you're looking for");

        const loadingTxt = await message.reply(`<:u_load:1334900265953923085> Searching on MyAnimeList`);

        malScraper.getInfoFromName(search)
            .then((data) => {
                let malEmbed = new EmbedBuilder()
                    .setTitle(`${data.englishTitle} (${data.japaneseTitle})`)
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
                    .setThumbnail(data.picture)
                    .setColor(client.config.embedColorTrans)
                    .setTimestamp()
                    .setFooter({ text: `${message.member.displayName} searched for ${args}`.split(',').join(' '), iconURL: message.author.displayAvatarURL({ dynamic: true }) })

                let link = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setStyle(ButtonStyle.Link)
                            .setLabel(`More about ${data.englishTitle} (${data.japaneseTitle})`)
                            .setURL(data.url)
                    )

                loadingTxt.edit({
                    content: '⁣',
                    embeds: [malEmbed],
                    components: [link]
                });
            });
    }
})