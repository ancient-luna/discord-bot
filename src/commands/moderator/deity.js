const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    let target = message.mentions.members.first();

    if (!target) return message.reply('please mention a user')

    let role = message.mentions.roles.first();

    if (!role) return message.reply('please mention a role after user')

    message.guild.channels.cache.get('860531645916774401').send(`<@${target.user.id}> joining us as <@&873872221368647690> from ${role}. Hope we can through this long journey together around Inner City as true <@&856379808937410590>`).then(target.roles.add(role));
    
    await message.delete();

    const addDF = new MessageEmbed()
        .setAuthor("ROLE ADDED", "https://i.imgur.com/ulP4oAd.png")
        .setDescription(`You have been gived **Alliances** role and have access to **Dead Frontier** category`)
        .setTimestamp()
        .setFooter("#Ancient Luna")
    target.user.send(addDF)
}

module.exports.help = {
    name: 'deity'
}