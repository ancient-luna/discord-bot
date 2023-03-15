const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    await message.delete().catch((e) => {});

    const IMGVanity = new MessageAttachment("src/assets/bdo/civilization_vanity.png")

    let embedVanity = new MessageEmbed()
        .setDescription(`<:xu_boss_kzarka:1085378897559957504> Kzarka <:xu_boss_kutum:1085378907806642286> Kutum <:xu_boss_nouver:1085378901510979594> Nouver <:xu_boss_karanda:1085378915234742353> Karanda <:xu_boss_murakanquint:1085378928585216143> Muraka & Quint <:xu_boss_offin:1085378921991770202>\nOffin <:xu_boss_garmoth:1085378935136718928> Garmoth <:xu_boss_vell:1085381103403147344> Vell`)
        .setColor("2f3136")

    await message.channel.send({ files: [IMGVanity], embeds: [embedVanity] }).catch(e => {});
}

module.exports.help = {
    name: 'vanity'
}