const { save } = require('../../../config/index');
module.exports = new Object({
  name: "setacceptrulemessage",
  description: "setacceptrulemessage.",
  category: "Admin",
  usage: "",
  cooldown: 0,
  aliases: ['setacceptrulemessage'],
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

    if (!args || args.length === 0) return message.reply({ content: 'Usage: !setacceptrulemessage <message>' });
    const ruleMessage = args.join(' ');
    if (ruleMessage === client.config.preMemberTriggerMessage) return message.reply({ content: 'Please set a different message than what is currently set.' });

    // eslint-disable-next-line no-param-reassign
    client.config.preMemberTriggerMessage = ruleMessage;

    save(client.config.preMemberTriggerMessage)
      .then(() => message.reply({ content: 'New accept rule message is set' }))
      .catch(() => message.reply({ content: 'There was an error in saving the new message in config' }))
    return null;
  }
})
