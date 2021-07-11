const { MessageEmbed} = require("discord.js");

module.exports.run = async (Client, message) => {
    const embed = new MessageEmbed()
        .setTitle(`Bandit has appeared`)
        .setDescription(`**Location:**\n\n<position>\n<position>\n<position>\n\nfrom Secronom Bunker\n\nCheck via **[DFP BossMap](https://www.dfprofiler.com/bossmap)**`)
        .setImage(`https://i.imgur.com/gku1JLT.png`)
        .setFooter(`Powered by Ancient Luna`)
        .setTimestamp()

    message.channel.send(embed);
}

module.exports.help = {
    name: 'bandit'
}