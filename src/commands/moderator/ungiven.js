const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    let target = message.mentions.members.first();

    if (!target) return message.reply('Please mention a member').catch((e) => {});

    let role = message.mentions.roles.first();

    if (!role) return message.reply('Add the role to remove').catch((e) => {});
    
    await message.react("✅").then(target.roles.remove(role)).catch((e) => {});
}

module.exports.help = {
    name: 'ungiven',
    aliases: ['removerole']
}