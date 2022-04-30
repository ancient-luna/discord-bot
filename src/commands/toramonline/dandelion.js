const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    let target = message.mentions.members.first();

    if (!target) return message.reply('please mention a user').catch(e => {});

    let role = message.mentions.roles.first();

    if (!role) return message.reply('please mention a role after user').catch(e => {});

    message.guild.channels.cache.get('952164768217706496').send(`<@${target.user.id}> joining us as alliance from ${role},\nHope we can through this long journey together around Toram world as a beauty growing White Dandelions.`).then(target.roles.add(role));
    
    await message.delete().catch((e) => {});

    const whiteDandelion = new MessageEmbed()
        .setAuthor({ name: "ROLE ADDED", iconURL: 'https://i.imgur.com/ejkkWCB.png' })
        .setDescription(`You have been gived **White Dandelions** role and have access to several channels in **[Departure from Iruna](https://discord.gg/hgjY95ZDQg)** category. Hope we can through this long journey together around Toram world as a beauty growing White Dandelions.`)
        .setTimestamp()
        .setColor("2f3136")
        .setFooter({ text: "Ancient Luna Guild: We ran as if to meet the moon" })
        
    await target.user.send({ embeds: [whiteDandelion] }).catch(e => {});
}

module.exports.help = {
    name: 'dandelion'
}