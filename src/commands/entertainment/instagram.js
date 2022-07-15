const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {

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

    const igDetail = new MessageEmbed()
        .setTitle(`${details.is_verified ? `${details.username} <a:verified:727820439497211994>` : ` ${details.username}`} ${details.is_private ? '🔒' : ''} `)
        .setDescription(details.biography)
        .setThumbnail(details.profile_pic_url_hd)
        .addFields(
            { name: "Total Posts:", value: details.edge_owner_to_timeline_media.count.toLocaleString(), inline: true },
            { name: "Followers:", value: details.edge_followed_by.count.toLocaleString(), inline: true },
            { name: "Following:", value: details.edge_follow.count.toLocaleString(), inline: true }
        )
        .setColor('2f3136')
        
    let igButton = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Instagram profile')
                .setURL(`https://instagram.com/${args[0]}`)
        )
        
    await message.reply({
        embeds: [igDetail],
        components: [igButton]
    })
}

module.exports.help = {
    name: 'instagram',
    aliases: ['ig']
}