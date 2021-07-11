const { MessageEmbed} = require("discord.js");

module.exports.run = async (Client, message) => {
    const embed = new MessageEmbed()
        .setTitle(`Volitile Leaper has spawned`)
        .setDescription(`**Location:** <position>\nfrom Wastelands first entrance\n\nCheck via **[DFP BossMap](https://www.dfprofiler.com/bossmap)**`)
        .setImage(`https://i.imgur.com/94JX6tV.png`)
        .setFooter(`Powered by Ancient Luna`)
        .setTimestamp()

    message.channel.send(embed);
}

module.exports.help = {
    name: 'vl'
}