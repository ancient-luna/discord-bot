const { save } = require('../../../config/index');

module.exports = new Object({
  name: "setalertvoicechannel",
  description: "setalertvoicechannel.",
  category: "Admin",
  usage: "",
  cooldown: 0,
  aliases: ['setalertvoicechannel'],
  examples: [''],
  sub_commands: [],
  args: false,
  permissions: {
    client: [],
    user: ['ManageGuild'],
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

    const member = message.member.voice.channel;

    if (!member) {
      return message.reply({ content: 'You need to be in a voice channel before using this command' });
    }
    // eslint-disable-next-line no-param-reassign
    client.config.voiceChannel = message.member.voice.channel.id;
    let channelName = message.member.voice.channel.name;
    save(client.config.voiceChannel)
      .then(() => message.reply({ content: `New voice channel for automatic notice is set on ${channelName}` }))
      .catch(() => message.reply({ content: 'There was an error in saving the new voice channel in config' }));
    return null;
  }
})


