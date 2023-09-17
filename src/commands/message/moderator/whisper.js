const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
module.exports = new Object({
  name: "whisper",
  description: "whisper.",
  category: "Moderator",
  usage: "",
  cooldown: 0,
  aliases: [''],
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
      .setDescription(`\`\`\`Dev. Contacts\`\`\`\n> Discord: imxo.e - [ancientluna](https://discord.com/invite/Sbp2nt8QHe) server\n> Email: daeva@ancientluna.org\n> Instagram: [@everylttlething](https://instagram.com/everylttlething)`)
      .setFooter({ text: `this bot won't read any messages of your replies` })
      .setColor("2b2d31")
      .setThumbnail('https://i.imgur.com/ik3A41k.png')

    const btnServer = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Go visit Sanctum")
          .setURL(`https://discord.com/channels/447069790150852609/1060992670035619931`)
      )
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Apply for Vacation")
          .setURL(`https://discord.com/channels/447069790150852609/1123093540940029972`)
      )

    let fileAtch = new AttachmentBuilder("src/assets/gluttony.mp4")

    user.send({
      content: `Dear **Lunar Disciples**,\n\n${str}\n\nWarmest love,\n__**Aevoa**__\n_ _`,
      embeds: [txtEmbed],
      components: [btnServer],
      files: [fileAtch]
    }).catch((e) => { return message.reply(`Doesn't allowed to whisper them`) });

    message.react("✉").catch((e) => { });
  }
});

