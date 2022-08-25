const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {

    if (!message.member.permissions.has("KICK_MEMBERS")) return;

    let target = message.mentions.members.first() || message.guild.users.cache.get(args[0]);

    if (!target) {
        return message.channel.send(
            `**${message.author.username}**, Please mention the person who you want to kick`
        );
    }

    if (target.id === message.guild.ownerId) {
        return message.channel.send("You cannot kick the Server Owner");
    }

    if (target.id === message.author.id) {
        return message.channel.send(
            `**${message.author.username}**, You can not kick yourself`
        );
    }

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given";

    let embed = new MessageEmbed()
        .setAuthor({ name: `ID ${target.id}` })
        .setDescription(`**${target} get kicked from the sanctuary**\nReason: *${reason}*`)
        .setThumbnail("https://i.imgur.com/sm8OXMp.png")
        .setFooter({ text: `Kicked by ${message.member.displayName}` })
        .setColor("2f3136")

    message.guild.channels.cache.get('839417251470901279').send({ embeds: [embed] }).catch((e) => { });

    target.kick(args[0]);

    message.react("✅").catch((e) => {});
}

module.exports.help = {
    name: 'dimmedlight',
    alises: ['kick']
}