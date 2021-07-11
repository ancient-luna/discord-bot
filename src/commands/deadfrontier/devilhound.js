const { MessageEmbed} = require("discord.js");

module.exports.run = async (Client, message) => {
    const embed = new MessageEmbed()
        .setTitle(`Devil Hound has spawned`)
        .setDescription(`**Location:** <position>\nfrom Secronom Bunker\n\nCheck via **[DFP BossMap](https://www.dfprofiler.com/bossmap)**`)
        .setImage(`https://i.imgur.com/0CffUcU.png`)
        .setFooter(`Powered by Ancient Luna`)
        .setTimestamp()

    message.channel.send(embed);
}

module.exports.help = {
    name: 'dh'
}