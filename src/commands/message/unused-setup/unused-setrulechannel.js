const { save } = require('../../../config/index');

module.exports = new Object({
  name: "acvsetrulechannel",
  description: "acvsetrulechannel.",
  category: "Admin",
  usage: "",
  cooldown: 0,
  aliases: ['setrulechannel'],
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

    if (!args || args.length === 0 || args.length > 1) {
      return message.reply({ content: 'Usage: !setrulechannel <channelId>' });
    }
    // eslint-disable-next-line no-param-reassign
    client.config.ruleChannel = message.channel.id;
    save(config)
      .then(() => message.reply({ content: 'New rule channel is set' }))
      .catch(() => message.reply({ content: 'There was an error in saving the new rule channel in config' }));
    return null;

  }
})



