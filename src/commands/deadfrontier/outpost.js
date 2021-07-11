const { MessageEmbed} = require("discord.js");

module.exports.run = async (Client, message) => {
    const embed = new MessageEmbed()
        .setTitle(`Alert! Outpost Attacks`)
        .setDescription(`**Starting time:** <time>\n**End time:** <time>\n\nServer time: <time>`)
        .setThumbnail(`https://i.imgur.com/wQTdB3G.png`,({ dynamic: true, size: 512 }))
        .setFooter(`Powered by Ancient Luna`)
        .setTimestamp()

    message.channel.send(embed);
}

module.exports.help = {
    name: 'oa'
}