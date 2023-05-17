const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    await message.delete().catch((e) => {});

    const IMGSoldier = new MessageAttachment("src/assets/bdo/civilization_soldier.png")

    let embedSoldier = new MessageEmbed()
        .setDescription(`WAR HEROES <:xx_bdo_warhero:1077617992243892335> ╮\nReact to this to get war heroes information and recruitment`)
        .setColor("2b2d31")

    await message.channel.send({ files: [IMGSoldier], embeds: [embedSoldier] }).catch(e => {});
}

module.exports.help = {
    name: 'soldier'
}