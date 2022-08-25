const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {

    if (!message.member.permissions.has("BAN_MEMBERS")) return;

    let target = message.mentions.members.first() || message.guild.users.cache.get(args[0]);

    if (!target) {
        return message.channel.send(
            `**${message.author.username}**, Please mention the person who you want to ban.`
        );
    }

    if (target.id === message.guild.ownerId) {
        return message.channel.send("You cannot Ban The Server Owner");
    }

    if (target.id === message.author.id) {
        return message.channel.send(
            `**${message.author.username}**, You can not ban yourself!`
        );
    }

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Oops, the ban-hammer already landed on them";

    let embed = new MessageEmbed()
        .setAuthor({ name: `ID ${target.id}`, iconURL: 'https://i.imgur.com/oZvnuem.png' })
        .setDescription(`**${target.username}#${target.discriminator}  get BANNED from the sanctuary**\nReason: *${reason}*`)
        .setImage("https://i.imgur.com/rG7qwId.gif")
        .setFooter({ text: `Banned by ${message.member.displayName}` })
        .setColor("2f3136")

    await message.guild.bans.create(target, {
        reason: reason
    }).then(() => {
        message.guild.channels.cache.get('839417251470901279').send({ embeds: [embed] })
    });

    message.react("✅").catch((e) => {});
}

module.exports.help = {
    name: 'blindednight',
    aliases: ['ban']
}