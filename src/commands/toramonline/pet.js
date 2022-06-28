const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    const ar = "<a:_util_arrow:864810269771300875>"

    let pet = new MessageEmbed()
        .setTitle("Tameable Monsters List")
        .setURL("https://discord.com/invite/Sbp2nt8QHe")
        .setDescription(`All documents are all from **[さるびあのトーラムメモ](https://slv-memo.space/)**`)
        .setTimestamp()
        .setFooter({ text: "Powered by Ancient Luna", iconURL: 'https://i.imgur.com/QZ2gLgq.png' })
        .setColor("202225")

    
    const petlist = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle("LINK")
                .setLabel("Normal Pet List")
                .setURL("https://slv-memo.space/pet/pet-list")
        )

        .addComponents(
            new MessageButton()
                .setStyle("LINK")
                .setLabel("Event Pet List")
                .setURL("https://slv-memo.space/pet/pet-list-event")
        )

    await message.reply({
        embeds: [pet],
        components: [petlist]
    }).catch((e) => {});
}

module.exports.help = {
    name: 'pet',
    aliases: ['pets', 'slave']
}