const { EmbedBuilder } = require("discord.js");
module.exports = new Object({
  name: "clearwisdom",
  description: "clearwisdom.",
  category: "Moderator",
  usage: "",
  cooldown: 0,
  aliases: [],
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
    if (args.length !== 1) return message.channel.send('Wrong usage. `!clearwisdom [1-100]`');
    const numberOfMessages = args[0];
    if (numberOfMessages > 100 || numberOfMessages < 0)
      return message.channel.send('Invalid number of messages. `!clearwisdom [1-100]`');
    await message.channel.bulkDelete(numberOfMessages)
      .then((messages) => {
        client.util.printLog('info', `Bulk deleted ${messages.size} messages`);
      })
      .catch(console.error);
  }
});