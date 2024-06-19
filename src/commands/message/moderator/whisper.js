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
    if (args.length < 2) return message.channel.send("Do: !whisper `userid` `message`").catch((e) => { });

    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]).user;

    const str = args.slice(1).join(" ");
    
    const img = new AttachmentBuilder("src/assets/gl.png")

    const txtEmbed = new EmbedBuilder()
      .setTitle(`Dev. Support Contacts <:verified:1204724590950228008>`)
      .setDescription(`> Discord: axxae - [ancientluna](https://discord.com/invite/Sbp2nt8QHe)\n> dae@ancientluna.org <:ins:1204725582852788256> [**IG**](https://instagram.com/everylttlething)`)
      .setFooter({ text: `this bot won't read any messages of your replies` })
      .setColor(client.config.embedColorTrans)
      .setThumbnail('https://i.imgur.com/nZqRDtz.png') // aevoa
      // .setImage('https://i.imgur.com/4uS7mor.png') // aevoa
      .setTimestamp()

    const btnServer = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Web")
          .setURL(`https://www.ancientluna.org`)
      )
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Video")
          .setURL(`https://www.youtube.com/@ancientluna`)
      )
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Steam Group")
          .setURL(`https://steamcommunity.com/groups/xxmoon`)
      )

    const failed = new EmbedBuilder()
      .setDescription(`<:wrong:1222439146593849425> Failed sending DM to <@${user.id}> due they close their DMs`)
      .setColor(client.config.embedColorTrans)
      
    const success = new EmbedBuilder()
      .setDescription(`<:check:1222439148720361502> Success sending DM to <@${user.id}>`)
      .setColor(client.config.embedColorTrans)

    user.send({
      content: `Dear **Lunar Disciples**,\n${str}\n\nWarmest regards,\n**Aevoa**\n_ _`,
      embeds: [txtEmbed],
      components: [btnServer],
      files: [img]
    }).then(() => {
      message.channel.send({ embeds: [success] });
    }).catch((e) => { 
      message.channel.send({ embeds: [failed] });
    });
  }
});