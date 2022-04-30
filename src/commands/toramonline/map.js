const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    const ar = "<a:_util_arrow:864810269771300875>"

    let map = new MessageEmbed()
        .setTitle("World Map")
        .setURL("https://discord.com/invite/Sbp2nt8QHe")
        .setDescription(`Iruna World is a world that created by combining places brought together by the 12 gods into one. After collapsing due to Cataclysm, it was performed randomly while Toram World is a different world that caused a Cataclysm after Coenubias made it collide with Iruna. It largely remains a mystery.`)
        .setImage("https://i.imgur.com/dpYHOPq.png")
        .setTimestamp()
        .setFooter({ text: "Powered by Ancient Luna", iconURL: 'https://i.imgur.com/QZ2gLgq.png' })
        .setColor("#4f545c")
        
    let iruna = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Iruna World Map')
                .setURL('https://toram-id.info/dye')
        )
        
    let toram = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Toram World Map')
                .setURL('https://toram-id.info/dye')
        )

    await message.reply({
        embeds: [dye],
        components: [iruna, toram]
    }).catch(e => {});
}

module.exports.help = {
    name: 'map'
}