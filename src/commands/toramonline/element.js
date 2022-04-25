const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    const ar = "<a:_util_arrow:864810269771300875>"

    let element = new MessageEmbed()
        .setTitle("Element Weakness")
        .setURL("https://discord.com/invite/Sbp2nt8QHe")
        .setDescription(`**Damage to <Element> +Y%** - Increases damage dealt to monsters of that element by Y%. A plain <Element> means it does 25% more damage against it's weaker Element.\n
        > *Fire* ${ar} *Earth* ${ar} *Wind* ${ar} *Water* ${ar} *Fire*
        > *Light* ${ar} *Dark*  ${ar} Light
        > *Neutral* ${ar} *Neutral*\n
        **<Element> Resistance +Y%** - Decreases damage taken by attacks of that element by Y%. This also includes the Neutral element. Doesn't matter if it's physical or magic damage.`)
        .setTimestamp()
        .setFooter({ text: "Powered by Ancient Luna", iconURL: 'https://i.imgur.com/QZ2gLgq.png' })
        .setColor("#2f3136")

    await message.reply({ embeds: [element] })
}

module.exports.help = {
    name: 'element',
    aliases: ['ele']
}