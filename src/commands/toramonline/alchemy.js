const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    const ar = "<a:_util_arrow:864810269771300875>"

    let alchemyLV = new MessageEmbed()
        .setTitle("Alchemy Proficiency Leveling")
        .setURL("https://discord.com/invite/Sbp2nt8QHe")
        .setDescription(`Suggested materials:\n
        ${ar} Lv. 0-10: Revita I
        ${ar} Lv. 11-30: Revita II
        ${ar} Lv. 30-55: Revita III
        ${ar} Lv. 30-65: Regera III
        ${ar} Lv. 56-70: Revita IV
        ${ar} Lv. 66-100: Vaccine III
        ${ar} Lv. 71-100: Revita V
        ${ar} Lv. 100-154: Flower Nectar x 10
        ${ar} Lv. 155-200: High-Purity Orcalcum`)
        .setTimestamp()
        .setFooter({ text: "Powered by Ancient Luna", iconURL: 'https://i.imgur.com/QZ2gLgq.png' })
        .setColor("#2f3136")

    await message.reply({ embeds: [alchemyLV] })
}

module.exports.help = {
    name: 'alchemy'
}