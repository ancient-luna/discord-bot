const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    const ar = "<a:_util_arrow:864810269771300875>"

    let fillstats = new MessageEmbed()
        .setTitle("Auto Fill Statting (Weapon/Armor)")
        .setURL("https://discord.com/invite/Sbp2nt8QHe")
        .setDescription(`This is a simulator, it mimics what happen in game. You can use this tool for trying out statting formula. This simulator WILL NOT produce any formula. Please refer to **[Smithing Guide](https://coryn.club/guide.php?key=smith)** for complete explanation on how to produce a formula.`)
        .setImage("https://i.imgur.com/dpYHOPq.png")
        .setTimestamp()
        .setFooter({ text: "Powered by Ancient Luna" })
        .setColor("#4f545c")
        
    let stats = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Fill Statting Simulator')
                .setURL('https://coryn.club/statting_simulator.php')
        )

    await message.reply({
        embeds: [fillstats],
        components: [stats]
    });
}

module.exports.help = {
    name: 'fillstats'
}