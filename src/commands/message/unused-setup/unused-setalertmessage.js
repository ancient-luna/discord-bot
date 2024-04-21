const { save } = require('../../../config/index');

module.exports = new Object({
  name: "acvsetalertmessage",
  description: "acvsetalertmessage.",
  category: "Admin",
  usage: "",
  cooldown: 0,
  aliases: ['setalertmessage'],
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

    if (!args || args.length === 0) return message.reply({ content: 'Usage: !setalertmessage <message>' });
    const voiceMessage = args.join(' ');
    if (voiceMessage === client.config.voiceMessage) return message.reply({ content: 'Please set a different message than what is currently set.' });

    // eslint-disable-next-line no-param-reassign
    client.config.voiceMessage = voiceMessage;

    save(client.config.voiceMessage)
      .then(() => message.reply({ content: 'New voice message is set' }))
      .catch(() => message.reply({ content: 'There was an error in saving the new voice message in config' }))
    return null;
  }
})

