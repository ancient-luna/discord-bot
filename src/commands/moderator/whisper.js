const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES")) return;
  if (args.length === 0) return message.channel.send("Do: !whisper `userid` `message`").catch((e) => {});

  const user =
    message.mentions.users.first() ||
    message.guild.members.cache.get(args[0]).user;
  
  const str = args.slice(1).join(" ");
  
  const embed = new MessageEmbed()
      .setDescription(`**Contacts**\n\nDiscord Username: Dae#0100\nEmail: daeva@ancientluna.org\nInsta: [@imsoondae_](https://instagram.com/imsoondae_)`)
      .setFooter({ text: `this bot won't read any messages of your replies` })
      .setColor('7289da')

  const btnServer = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setStyle("LINK")
      .setLabel("Guild Forum")
      .setURL(`https://www.sea.playblackdesert.com/en-US/Forum/ForumTopic/Detail?_topicNo=42709&_page=1&_opinionNo=69067`)
    )
    .addComponents(
      new MessageButton()
      .setStyle("LINK")
      .setLabel("Visit Sanctum")
      .setURL(`https://discord.com/channels/447069790150852609/1060992670035619931`)
    )

  user.send({
    content: `Dear Lunar Disciples,\n\n${str}\n\nLove,\n**Aevoa**\n⁣`,
    components: [btnServer]
  }).catch((e) => {});
}

module.exports.help = {
  name: 'whisper'
}