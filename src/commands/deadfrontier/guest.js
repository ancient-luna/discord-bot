const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    let target = message.mentions.members.first();

    if (!target) return message.reply('please mention a user').catch((e) => {});

    let role = message.mentions.roles.first();

    if (!role) return message.reply('please mention a role after user').catch((e) => {});

    message.guild.channels.cache.get('860531645916774401').send(`A survivor called as <@${target.user.id}> visiting us.\nBy all means, if you wish to present us with a review only a true survivor would,\nenlighten us so we may bask in its light.`).then(target.roles.add(role)).catch((e) => {});
    
    await message.delete().catch((e) => {});

    const addDF = new MessageEmbed()
        .setAuthor({ name: "ROLE ADDED", iconURL: 'https://i.imgur.com/aLkmV4I.png' })
        .setDescription("You have been gived **Survivors** role as a guest and have access to several channels in **Dead Frontier** category. By all means, if you wish to present us with a review only a true survivor would, enlighten us so we may bask in its light")
        .setTimestamp()
        .setColor("2f3136")
        .setFooter({ text: "Ancient Luna Guild: We ran as if to meet the moon" })
    await target.user.send({ embeds: [addDF] }).catch((e) => {});
}

module.exports.help = {
    name: 'guest'
}