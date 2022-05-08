const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    const ar = "<a:_util_arrow:864810269771300875>"

    let element = new MessageEmbed()
        .setTitle("Element Weakness")
        .setURL("https://discord.com/invite/Sbp2nt8QHe")
        .setDescription(`**Damage to <Element> +Y%**\nIncreases damage dealt to monsters of that element by Y%\nA plain <Element> means it does 25% more damage against it's weaker Element.\n\n> *Fire* ${ar} *Earth* ${ar} *Wind* ${ar} *Water* ${ar} *Fire*\n> *Light* ${ar} *Dark*  ${ar} Light\n> *Neutral* ${ar} *Neutral*\n\n**<Element> Resistance +Y%**\nDecreases damage taken by attacks of that element by Y%\nThis also includes the Neutral element.\nDoesn't matter if it's physical or magic damage.`)
        .setTimestamp()
        .setImage("https://i.imgur.com/bFivP6Q.png")
        .setFooter({ text: "Powered by Ancient Luna", iconURL: 'https://i.imgur.com/QZ2gLgq.png' })
        .setColor("#2f3136")

    await message.reply({ embeds: [element] }).catch(e => {});
}

module.exports.help = {
    name: 'element',
    aliases: ['ele']
}