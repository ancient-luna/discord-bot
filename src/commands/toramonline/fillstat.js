const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    const ar = "<a:_util_arrow:864810269771300875>"

    let fillstats = new MessageEmbed()
        .setTitle("Auto Fill Statting (Weapon/Armor)")
        .setURL("https://discord.com/invite/Sbp2nt8QHe")
        .setDescription(`This is an automatic statting simulator of Weapon and Armor. It automatically calculate steps, success rate and material cost of gear statting you want. Initial setting is to simulate statting of the latest level cap.`)
        .setTimestamp()
        .setFooter({ text: "Powered by Ancient Luna", iconURL: 'https://i.imgur.com/QZ2gLgq.png' })
        .setColor("#2f3136")
        
    let statsWeaponArmor = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Fill Statting Weapon')
                .setURL('http://tanaka0.work/en/BukiProper')
        )

        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Fill Statting Armor')
                .setURL('http://tanaka0.work/en/BouguProper')
        )

    await message.reply({
        embeds: [fillstats],
        components: [statsWeaponArmor]
    }).catch(e => {});
}

module.exports.help = {
    name: 'fillstat',
    aliases: ['autofill']
}