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

    const txtEmbed = new EmbedBuilder()
      .setDescription(`\`\`\`Dev Contacts\`\`\`\nDiscord: Dae#9002\nEmail: daeva@ancientluna.org\nInstagram: [@imsoondae_](https://instagram.com/imsoondae_)`)
      .setFooter({ text: `this bot won't read any messages of your replies` })
      .setColor("2b2d31")

    const btnServer = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Go vote for GBR new time here now")
          .setURL(`https://discord.com/channels/447069790150852609/1060992992523079800/1116643824970776576`)
      )

    user.send({
      content: `Dear **Lunar Disciples**,\n\n${str}\n\nLove,\n**Aevoa**\n⁣`,
      embeds: [txtEmbed],
      components: [btnServer]
    }).catch((e) => { });
  }
});

