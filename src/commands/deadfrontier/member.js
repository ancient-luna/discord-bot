const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    let target = message.mentions.members.first();

    if (!target) return message.reply('Please mention them, the one who is about to be a Levatio').catch((e) => {});

    let role = '1052973235710464040';

    message.guild.channels.cache.get('860531645916774401').send(`An luna lux vanitas, <@${target.user.id}>\nMay the lights guide us, so we may bask in its light as true <@&${role}>`).then(target.roles.add(role)).catch((e) => {});
    
    await message.delete().catch((e) => {});

    const addDF = new MessageEmbed()
        .setAuthor({ name: "ROLE ADDED", iconURL: 'https://i.imgur.com/aLkmV4I.png' })
        .setDescription("You have been gived **Levatio** role and have access to all channels as an official member in **Dead Frontier** category. May the lights guide us, so we may bask in its light as true levatios")
        .setTimestamp()
        .setColor("2b2d31")
        .setFooter({ text: "Ancient Luna: We ran as if to meet the moon" })
    await target.user.send({ embeds: [addDF] }).catch((e) => {});
}

module.exports.help = {
    name: 'levatio'
}