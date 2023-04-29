const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    await message.delete().catch((e) => {});

    const IMGthecalls = new MessageAttachment("src/assets/df/thecalls.png")

    let embedCalls = new MessageEmbed()
        .setDescription(`<:zdf_call_outpostattack:1101942716104974438> Outpost Attacks\n<:zdf_call_mission:1101942084056911995> Missions\n<:zdf_call_bandit:1101941930620899452> Bandit Raid\n<:zdf_call_devilhound:1101941570640556103> Devil Hounds\n<:zdf_call_volatileleaper:1101941601808425130> Volatile Leapers`)
        .setColor("2f3136")

    await message.channel.send({ files: [IMGthecalls], embeds: [embedCalls] }).catch(e => {});
}

module.exports.help = {
    name: 'thecalls'
}