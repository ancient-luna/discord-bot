const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
import fetch from 'node-fetch';

module.exports = new Object({
    name: "instagram",
    description: "instagram.",
    category: "Entertainment",
    usage: "",
    cooldown: 0,
    aliases: ['ig'],
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
        if (!args[0]) {
            return message.channel.send(`Please tell me the username`)
        }
        let url, response, account, details;
        try {
            url = `https://instagram.com/${args[0]}/?__a=1`;
            response = await fetch(url).then(res => res.json())
            account = response.data
            details = account.graphql.user
        } catch (error) {
            return message.channel.send(`I um.. so sorry.. i couldn't get the data due to error, blame ancestor`)
        }

        const igDetail = new EmbedBuilder()
            .setTitle(`${details.is_verified ? `${details.username} <a:verified:727820439497211994>` : ` ${details.username}`} ${details.is_private ? '🔒' : ''} `)
            .setDescription(details.biography)
            .setThumbnail(details.profile_pic_url_hd)
            .addFields(
                { name: "Total Posts:", value: details.edge_owner_to_timeline_media.count.toLocaleString(), inline: true },
                { name: "Followers:", value: details.edge_followed_by.count.toLocaleString(), inline: true },
                { name: "Following:", value: details.edge_follow.count.toLocaleString(), inline: true }
            )
            .setColor('2b2d31')

        let igButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Instagram profile')
                    .setURL(`https://instagram.com/${args[0]}`)
            )

        await message.reply({
            embeds: [igDetail],
            components: [igButton]
        })
    }
});