const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    let target = message.mentions.members.first();

    if (!target) return message.reply('please mention a user')

    let role = message.mentions.roles.first();

    if (!role) return message.reply('please mention a role after user')

    message.guild.channels.cache.get('860531645916774401').send(`A survivor called as <@${target.user.id}> visiting us.\nBy all means, if you wish to present us with a review only a true survivor would,\nenlighten us so we may bask in its light.`).then(target.roles.add(role));
    
    await message.delete();

    const addDF = new MessageEmbed()
        .setAuthor("ROLE ADDED", "https://i.imgur.com/aLkmV4I.png")
        .setDescription("You have been gived **Survivors** role as a guest and have access to several channels in **Dead Frontier** category. By all means, if you wish to present us with a review only a true survivor would, enlighten us so we may bask in its light")
        .setTimestamp()
        .setFooter("#Ancient Luna")
    target.user.send(addDF)
}

module.exports.help = {
    name: 'guest'
}