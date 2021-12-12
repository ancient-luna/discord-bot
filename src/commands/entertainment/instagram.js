const { MessageEmbed } = require("discord.js");
const { MessageButton } = require("discord-buttons");
const axios = require("axios");

module.exports.run = async (client, message, args) => {
    if (!args[0]) {
        return message.channel.send(`By the moonlight, what you seeks for?`)
    }

    let url, response, account, details;
    try {
        url = `https://instagram.com/${args[0]}/?__a=1`;
        response = await axios.get(url)
        account = response.data
        details = account.graphql.user
    } catch (error) {
        return message.channel.send(`${args[0]} is an unregistered Instagram's username`)
    }

    const embed = new MessageEmbed()
        .setTitle(`${details.is_verified ? `${details.username} <a:verified:727820439497211994>` : ` ${details.username}`} ${details.is_private ? '🔒' : ''} `)
        .setDescription(details.biography)
        .setThumbnail(details.profile_pic_url_hd)
        .addFields(
            {
                name: "Total Posts:",
                value: details.edge_owner_to_timeline_media.count.toLocaleString(),
                inline: true
            },
            {
                name: "Followers:",
                value: details.edge_followed_by.count.toLocaleString(),
                inline: true
            },
            {
                name: "Following:",
                value: details.edge_follow.count.toLocaleString(),
                inline: true
            }
        )

    const buttonProfile = new MessageButton()
        .setStyle("url")
        .setLabel("Redirect to Instagram")
        .setURL(`https://instagram.com/${args[0]}`)

    await message.channel.send({
        button: buttonProfile,
        embed: embed
    })
}

module.exports.help = {
    name: 'ig'
}
