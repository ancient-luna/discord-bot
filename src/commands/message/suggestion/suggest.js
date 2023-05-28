const { EmbedBuilder } = require("discord.js");
module.exports = new Object({
  name: "suggest",
  description: "suggest.",
  category: "Suggestion",
  usage: "",
  cooldown: 0,
  aliases: [],
  examples: [''],
  sub_commands: [],
  args: false,
  permissions: {
    client: [],
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
    const suggestionQuery = args.join(' ');

    if (!suggestionQuery) return message.reply('Please specify a suggestion.').catch((e) => { });

    const embed = new EmbedBuilder()
      .setAuthor({ name: message.author.tag })
      .setDescription(`${suggestionQuery}`)
      .setColor('4f545c')

    message.channel.send('Submitted suggestion is at <#842069893113446410> !').then((msg) => {
      setTimeout(() => { msg.delete().catch((e) => { }) }, 5000)
    });

    message.guild.channels.cache.get('842069893113446410').send({ embeds: [embed] }).then((msg) => {
      msg.react('<:vcon_vote_upvote:859075141051613214>').catch((e) => { });
      msg.react('<:vcon_vote_disagree:859075141668700200>').catch((e) => { });
    }).catch((e) => { });

    await message.delete().catch((e) => { });
  }
});






