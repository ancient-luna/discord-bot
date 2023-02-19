const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {

    const sanctumHall = '1060992670035619931'

    if (!sanctumHall.includes(message.channel.id)) return message.channel.send(`*You can't send a vacancy letter from here, go back to <#1060992670035619931> to send!*`).then((msg) => {
        setTimeout(() => msg.delete().catch((e) => {}), 5000);
        setTimeout(() => message.delete().catch((e) => {}));
    }).catch((err) => {
        throw err;
    })

    if (!args[0]) return message.channel.send(`*You can't let the vacancy letter be an empty-ink letter. Do write __days__ __reason__*`).then((msg) => {
        setTimeout(() => msg.delete().catch((e) => {}), 5000);
        setTimeout(() => message.delete().catch((e) => {}));
    }).catch((err) => {
        throw err;
    })
    
    const days = args[0];
    
    if(!days) return message.channel.send({ content: "You forgot to put days off. Do write __days__ __reason__" }).then((msg) => {
        setTimeout(() => msg.delete().catch((e) => {}), 5000);
        setTimeout(() => message.delete().catch((e) => {}));
    }).catch((err) => {
        throw err;
    })

    const words = args.slice(1).join(" ");
    
    if(!words) return message.channel.send({ content: "You forgot to put the reason for your days off. Do write __days__ __reason__" }).then((msg) => {
        setTimeout(() => msg.delete().catch((e) => {}), 5000);
        setTimeout(() => message.delete().catch((e) => {}));
    }).catch((err) => {
        throw err;
    })

    await message.delete().catch((e) => {});

    const absenceNote = new MessageEmbed()
        .setAuthor({ name: "Vacancy Letter" })
        .setDescription(`*Dear Elders,\nRequested Day Off: __${days} Day__\n\n${words}\n\nYours sincerely,*\n***${message.member.displayName}***`)
        .setColor('2f3136')
        .setThumbnail('https://i.imgur.com/EpDcu9d.png')

    if (message.channel.id === sanctumHall) {
        message.guild.channels.cache.get('1076767724224659526').send({ embeds: [absenceNote] }).catch((e) => {});
        message.channel.send(`*The vacancy letter has been delivered to the Elders. All your privacy will be kept safe under them*`).then((msg) => {
            setTimeout(() => msg.delete().catch((e) => {}), 5000);
            setTimeout(() => message.delete().catch((e) => {}));
        }).catch((err) => {
            throw err;
        })
    } else {
        return;
    }
}

module.exports.help = {
    name: 'absence'
}