const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES")) return;
  if (args.length === 0) return message.channel.send("Do: !whisper [userid] [message]");

  const user =
    message.mentions.users.first() ||
    message.guild.members.cache.get(args[0]).user;
  
  const str = args.slice(1).join(" ");
  
  const embed = new MessageEmbed()
      .setDescription(`**Email**: daeva@ancientluna.org\n**Discord**: Dae#0090`)
      .setFooter({ text: `this bot won't read any of your replies` })
      .setColor('7289da')

      const btnServer = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setStyle("LINK")
          .setLabel("Discord Server")
          .setURL(`https://discord.com/invite/Sbp2nt8QHe`)
       )
        .addComponents(
          new MessageButton()
          .setStyle("LINK")
          .setLabel("Website")
          .setURL(`https://ancientluna.org`)
        )

  user.send(`${str}\n⁣`, {
    embeds: [embed],
    components: [btnServer]
  });
}

module.exports.help = {
  name: 'whisper'
}