const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
    if(!args[0]) return message.channel.send({ content: "Please define a time.\nEx: \`10m\` is 10 minutes." }).catch(e => {});
    if(!args[1]) return message.channel.send({ content: "Please define a thing for the timer to remind you about.\nEx: \`Going to land and start cooking\`" }).catch(e => {});

    let embed1 = new MessageEmbed()
    .setDescription(`I will remind you in **${args[0]}** about *${args.slice(1).join(" ")}*`)
    .setColor('#2f3136')
    .setTimestamp()
    .setFooter({ text: `Reminder is set`, iconURL: 'https://i.imgur.com/ynkgwTK.gif'})

    let embed2 = new MessageEmbed()
    .setAuthor({ name: `${message.author.username}'s Reminder`, iconURL: message.author.displayAvatarURL() })
    .setDescription(`*" ${args.slice(1).join(" ")} "*`)
    .setColor('#2f3136')
    .setTimestamp()
    .setFooter({ text: `Reminder was set for ${args[0]}`})

    message.channel.send({ embeds: [embed1] }).catch(e => {})

    setTimeout(async () => {
        message.channel.send({ content: `<:ancientluna_divinare:841754250949820416><@${message.author.id}> ${args[0]} has passed,`, embeds: [embed2] }).catch(e => {})
    }, ms(args[0]));

}

module.exports.help = {
    name: 'a'
}
