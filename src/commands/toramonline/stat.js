const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    const ar = "<a:_util_arrow:864810269771300875>"

    let statscalc = new MessageEmbed()
        .setTitle("Stat Calculator")
        .setURL("https://discord.com/invite/Sbp2nt8QHe")
        .setDescription(`Formula used on this calculator is based on the explanation at **[Toram Wiki's Status](https://www.dopr.net/toramonline-wiki/status)** page and **[Coryn Club](https://coryn.club/index.php)** findings.`)
        .setTimestamp()
        .setFooter({ text: "Powered by Ancient Luna", iconURL: 'https://i.imgur.com/QZ2gLgq.png' })
        .setColor("#2f3136")
        
    let stats = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Stat Calculator')
                .setURL('https://coryn.club/stat_calculator.php')
        )

    await message.reply({
        embeds: [statscalc],
        components: [stats]
    });
}

module.exports.help = {
    name: 'stat',
    aliases: ['playerstat']
}