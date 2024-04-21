const { save } = require('../../../config/index');

module.exports = new Object({
  name: "acvsetgeneralchannel",
  description: "acvsetgeneralchannel.",
  category: "Admin",
  usage: "",
  cooldown: 0,
  aliases: ['setgeneralchannel'],
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

    if (!args || args.length === 0 || args.length > 1) return message.reply({ content: 'Usage: !setgeneralchannel <channelId>' });
    // eslint-disable-next-line no-param-reassign
    client.config.generalChannel = message.channel.id;
    save(client.config.generalChannel)
      .then(() => message.reply({ content: 'New general channel is set' }))
      .catch(() => message.reply({ content: 'There was an error in saving the new general channel in config' }));
    return null;
  }
})



