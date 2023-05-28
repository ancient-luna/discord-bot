const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = new Object({
  name: "whisper",
  description: "whisper.",
  category: "Moderator",
  usage: "",
  cooldown: 0,
  aliases: [],
  examples: [''],
  sub_commands: [],
  args: false,
  permissions: {
    client: ['ManageGuild'],
    user: ['ManageMessages'],
    dev: false,
  },
  player: { voice: false, active: false, dj: false, },
  /**
   * 
   * @param {import("../../../index")} client 
   * @param {import("discord.js").Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (args.length === 0) return message.channel.send("Do: !whisper `userid` `message`").catch((e) => { });

    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]).user;

    const str = args.slice(1).join(" ");

    const embed = new EmbedBuilder()
      .setDescription(`**Contacts**\n\nDiscord Username: Dae#0100\nEmail: daeva@ancientluna.org\nInsta: [@imsoondae_](https://instagram.com/imsoondae_)`)
      .setFooter({ text: `this bot won't read any messages of your replies` })
      .setColor('7289da')

    const btnServer = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Guild Forum")
          .setURL(`https://www.sea.playBLACKDESERT.com/en-US/Forum/ForumTopic/Detail?_topicNo=42709&_page=1&_opinionNo=69067`)
      )
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Visit Sanctum")
          .setURL(`https://discord.com/channels/447069790150852609/1060992670035619931`)
      )

    user.send({
      content: `Dear Lunar Disciples,\n${str}\n\nLove,\n**Aevoa**\n⁣`,
      components: [btnServer]
    }).catch((e) => { });
  }
});

