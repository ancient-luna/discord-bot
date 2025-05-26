const { ChannelType } = require("discord.js");

module.exports = new Object({
  name: "messageCreate",
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").Message} message
   */
  async execute(client, message) {

    if (message.author.bot || message.channel.type === ChannelType.DM) return;

    if (client.config.aiChatChannel.includes(message.channel.id)) {
      return null;
    }
  },
});