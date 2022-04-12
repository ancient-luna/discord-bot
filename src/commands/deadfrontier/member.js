const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    let target = message.mentions.members.first();

    if (!target) return message.reply('please mention a user')

    let role = message.mentions.roles.first();

    if (!role) return message.reply('please mention a role after user')

    message.guild.channels.cache.get('860531645916774401').send(`Please welcome our new member, <@${target.user.id}>\nMay the lights guide us, so we may bask in its light as true ${role}`).then(target.roles.add(role));
    
    await message.delete();

    const addDF = new MessageEmbed()
        .setAuthor({ name: "ROLE ADDED", iconURL: 'https://i.imgur.com/aLkmV4I.png' })
        .setDescription("You have been gived **Fellow Seekers** role and have access to all channels as an official member in **Dead Frontier** category. May the lights guide us, so we may bask in its light as true fellow seekers")
        .setTimestamp()
        .setFooter({ text: "Ancient Luna Guild: We ran as if to meet the moon" })
    await target.user.send({ embeds: [addDF] })
}

module.exports.help = {
    name: 'member'
}