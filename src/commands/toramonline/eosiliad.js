const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    let target = message.mentions.members.first();

    if (!target) return message.reply('please mention a user')

    let role = message.mentions.roles.first();

    if (!role) return message.reply('please mention a role after user')

    message.guild.channels.cache.get('952167473023692850').send(`Please welcome our new departured legendary saviour, <@${target.user.id}>\nMay the lights guide us, within ${role} bond for the unseen journey <:xot_toram_guild:952260952324202498>`).then(target.roles.add(role));
    
    await message.delete();

    const addEOS = new MessageEmbed()
        .setAuthor({ name: "ROLE ADDED" }, { name: "https://i.imgur.com/ejkkWCB.png" })
        .setDescription("You have been gived **Eos's Iliad** role and have access to all channels as an official member in **[Departure from Iruna](https://discord.gg/hgjY95ZDQg)** category. May the lights guide us, so we may bask in its light as a true legendary saviour")
        .setTimestamp()
        .setFooter({ text: "Ancient Luna Guild: We ran as if to meet the moon" })
    target.user.send({ embeds: [addEOS] })
}

module.exports.help = {
    name: 'eosiliad'
}