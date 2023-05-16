const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {

    const mapIruna = new MessageEmbed()
        .setTitle("World Map")
        .setURL("https://discord.com/invite/Sbp2nt8QHe")
        .setImage("https://i.imgur.com/UIxyMwM.jpg")
        .setColor("2b2d31")

    const mapToram = new MessageEmbed()
        .setImage("https://i.imgur.com/dam0jwe.jpg")
        .setTimestamp()
        .setFooter({ text: "Powered by Ancient Luna", iconURL: 'https://i.imgur.com/QZ2gLgq.png' })
        .setColor("2b2d31")
    
    message.reply({ embeds: [mapIruna, mapToram] }).catch(e => {});
}

module.exports.help = {
    name: 'map'
}