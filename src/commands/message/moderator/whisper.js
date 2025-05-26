const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
module.exports = new Object({
  name: "whisper",
  description: "dm to mentioned members",
  category: "moderator",
  usage: `${client.prefix}whisper <userid> <message>`,
  cooldown: 0,
  aliases: [],
  examples: [],
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
    if (args.length < 2) return message.channel.send("Do: `!whisper` `userid` `message`");

    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]).user;

    const str = args.slice(1).join(" ");
    
    const img = new AttachmentBuilder("src/assets/ancientluna-tag.png")

    const txtEmbed = new EmbedBuilder()
      .setTitle(`Dev. Support Contacts <:sc_verified:1334889120849330266>`)
      .setDescription(`> Discord: asonofbiscuit - [ancientluna](https://discord.com/invite/Sbp2nt8QHe)\n> ~~dae@ancientluna.org~~ <:sc_ins:1334889482633084989> ~~**IG**~~`)
      .setFooter({ text: `this bot won't read any messages of your replies` })
      .setColor(client.config.embedColorTrans)
      .setThumbnail('https://i.imgur.com/vfx9TEB.png') // aevoa
      // .setImage('https://i.imgur.com/4uS7mor.png') // aevoa
      .setTimestamp()

    const btnServer = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("YouTube")
          .setURL(`https://www.youtube.com/@ancientluna`),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("Steam Group")
          .setURL(`https://steamcommunity.com/groups/xxmoon`),
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Get The Tag Now")
            .setURL(`https://discord.gg/ch8f2CUe7q`),
      )

    const failed = new EmbedBuilder()
      .setDescription(`<:srv_deny:1334881089205829674> Failed sending DM to <@${user.id}> due they close their DMs`)
      .setColor(client.config.embedColorTrans)
      
    const success = new EmbedBuilder()
      .setDescription(`<:srv_accept:1334881070449164378> Success sending DM to <@${user.id}>`)
      .setColor(client.config.embedColorTrans)

    user.send({
      content: `Dear **Lunar Disciples**,\n${str}\n\nWarmest regards,\n**Aevoa**\n_ _`,
      // embeds: [txtEmbed],
      components: [btnServer],
      files: [img]
    }).then(() => {
      message.channel.send({ embeds: [success] });
    }).catch((e) => { 
      message.channel.send({ embeds: [failed] });
    });
  }
});