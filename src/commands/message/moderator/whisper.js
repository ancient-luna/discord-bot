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
      .setTitle(`Dev. Contacts <:verified:1204724590950228008>`)
      .setDescription(`> Discord: axxae - [ancientluna](https://discord.com/invite/Sbp2nt8QHe)\n> dae@ancientluna.org <:ins:1204725582852788256> [everylttlething](https://instagram.com/everylttlething)`)
      .setFooter({ text: `this bot won't read any messages of your replies` })
      .setColor(client.config.embedColorTrans)
      .setThumbnail('https://i.imgur.com/veLhH04.png')
      // .setImage('https://i.imgur.com/4uS7mor.png')

    const btnServer = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Chat with family")
          .setEmoji('<:game_logo_bdo:861579805660151818>')
          .setURL(`https://discord.com/channels/447069790150852609/1060992670035619931`)
      )
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Web")
          .setURL(`https://ancientluna.org`)
      )
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Videos")
          .setURL(`https://www.youtube.com/@ancientluna/about`)
      )

    // let fileAtch = new AttachmentBuilder('src/assets/wheelingdapho.png')

    const failed = new EmbedBuilder()
      .setDescription(`<:wrong:1222439146593849425> Failed sending DM to <@${member.user.id}> due they close their DMs`)
      .setColor(client.config.embedColorTrans)
      
    const success = new EmbedBuilder()
      .setDescription(`<:check:1222439148720361502> Success sending DM to <@${member.user.id}>`)
      .setColor(client.config.embedColorTrans)

    user.send({
      content: `Dear **Lunar Disciples**,\n${str}\n\nWarmest regards,\n[**Aevoa**](https://steamcommunity.com/id/axxae/)\n_ _`,
      embeds: [txtEmbed],
      components: [btnServer],
      // files: [fileAtch]
    }).then(() => {
      message.channel.send({ embeds: [success] });
    }).catch((e) => { 
      message.channel.send({ embeds: [failed] });
    });
  }
});