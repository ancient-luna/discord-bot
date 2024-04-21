const { save } = require('../../../config/index');

module.exports = new Object({
  name: "acvsetmemberrole",
  description: "acvsetmemberrole.",
  category: "Admin",
  usage: "",
  cooldown: 0,
  aliases: ['setmemberrole'],
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

    if (!args || args.length === 0 || args.length > 1) return message.reply({ content: 'Usage: !setmemberrole <channelId>' });

    // eslint-disable-next-line no-param-reassign
    client.config.preMemberRole = message.channel.id;

    save(client.config.preMemberRole)
      .then(() => message.reply({ content: 'New member role is set.' }))
      .catch(() => message.reply({ content: 'There was an error in saving the new member role in config' }));
    return null;

  }
})




