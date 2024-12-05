const { ChannelType, AttachmentBuilder } = require("discord.js");

module.exports = new Object({
  name: "messageCreate",
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").Message} message
   */
  async execute(client, message) {
    // Ignore messages from bots, DMs, or webhooks
    if (message.author.bot || !message.guild || message.channel.type === ChannelType.DM) return;

    const noCuss = new AttachmentBuilder('src/assets/react/nocussnuuh.mp4')
    const bannedWords = ["fuck", "ass", "bitch", "cunt"];
    if (bannedWords.some(word => new RegExp(`\\b${word}\\b`, 'i').test(message.content))) {
      await message.reply({ files: [noCuss] });
      return message.channel.send(`-# be wise ${message.author.displayName} or we square up`)
    }

    const responses = {
      "dae": "our ancestor? he sleep ... for the eternals",
    };

    const response = responses[message.content.toLowerCase()];
    if (response) {
      await message.reply(response);
    }
  },
});
