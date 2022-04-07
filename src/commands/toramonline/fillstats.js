const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    const ar = "<a:_util_arrow:864810269771300875>"

    let fillstats = new MessageEmbed()
        .setTitle("Auto Fill Statting (Weapon/Armor)")
        .setURL("https://discord.com/invite/Sbp2nt8QHe")
        .setDescription(`This is an automatic statting simulator of Weapon/Armor. It automatically calculate steps, success rate and material cost of gear statting you want.`)
        .setImage("https://i.imgur.com/dpYHOPq.png")
        .setFooter({ text: "Ancient Luna Guild  •  Partnership: Ray Miku" })
        .setColor("#4f545c")
        
    let stats = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Fill Stats Weapon')
                .setURL('http://tanaka0.work/en/BukiProper')
        )
        .addComponents(            
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Fill Stats Armor')
                .setURL('http://tanaka0.work/en/BouguProper')
        )

    await message.channel.send({
        embeds: [fillstats],
        components: [stats]
    });
}

module.exports.help = {
    name: 'fillstats'
}