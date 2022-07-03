const { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton } = require("discord.js");

module.exports.run = async (Client, message, args) => {

    const IMGwisdom = new MessageAttachment("src/assets/ancientluna.png")

    const descGeneral = new MessageEmbed()
        .setDescription(`**General**\n\n\`!anime\` : search for anime through myanimelist\n\`!dictionary\` : search by word through urban dictionary\n\`!inspire\` : give you an inspiring quotes\n\`!instagram\` : show instagram profile\n\`!lifeadvice\` : give you an advice\n\`!reminder\` : set timer for your activity\n\`!translate\` : translator. support 14 languages\n\`!wikipedia\` : search by word through wikipedia\n\`!youtube\` : watch youtube together`)
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setColor("2f3136")

    const descToram = new MessageEmbed()
        .setDescription(`**Toram Online**\n\n\`!alchemy\` : give alchemy level list\n\`!bag\` : give bags materials for upgrading slot list\n\`!blacksmith\` : give blacksmith level list\n\`!crystalist\` : give crysta within their upgradeable crysta list\n\`!dye\` : give monthly dye list *(link)*\n\`!element\` : give information about element\n\`!fillstat\` : give fill stats weapon/armor calculator *(link)*\n\`!food\` : give information about food + *(link)*\n\`!level\` : give information about leveling list\n\`!map\` : give latest update about map\n\`!material\` : give information about materials spot\n\`!pet\` : give information about pets *(link)*\n\`!stat\` : give character stat calculator *(link)*`)
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setColor("2f3136")

    const descMinecraft = new MessageEmbed()
        .setDescription(`**Minecraft**\n\n\`!mcserver\` : show luna craft server information`)
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setColor("2f3136")

    const descDeadFrontier = new MessageEmbed()
        .setDescription(`**Dead Frontier**\n\n\`!record\` : give latest information about your best record in game\n\`!status\` : give you latest game character information`)
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setColor("2f3136")

    const descBonus = new MessageEmbed()
        .setDescription(`**What is this?**\n\n\`!rawr\` : what does it do?\n\`!tomato\` : what does it do either?\n\`!spit\` : what does it do either after?`)
        .setImage("https://i.imgur.com/V0UhnF9.png")
        .setFooter({ text: "discord.gg/ancientluna", iconURL: 'https://i.imgur.com/1ooFs6C.gif' })
        .setColor("2f3136")

    let serverButton = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Discord Server')
                .setURL('https://discord.com/invite/Sbp2nt8QHe')
        )
        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('YouTube')
                .setURL('https://www.youtube.com/watch?v=wq0DURi1ekY')
        )
        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Website')
                .setURL('https://ancientluna.org')
        )

    message.reply({
        files: [IMGwisdom],
        embeds: [descGeneral, descMinecraft, descToram, descDeadFrontier, descBonus],
        components: [serverButton]
    })
}

module.exports.help = {
    name: 'wisdomoflleud',
    aliases: ['help', 'about']
}