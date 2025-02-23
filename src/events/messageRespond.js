const { ChannelType, AttachmentBuilder } = require("discord.js");

module.exports = new Object({
  name: "messageCreate",
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").Message} message
   */
  async execute(client, message) {
    const guildsID = '447069790150852609';

    if (message.author.bot || message.guild.id !== guildsID || message.channel.type === ChannelType.DM) return;

    const noCuss = new AttachmentBuilder('src/assets/react/nocussnuuh.mp4')
    const bannedWords = ["fuck", "bitch", "cunt", "dick"];
    if (bannedWords.some((word) => message.content.toLowerCase().includes(word))) {
      if (Math.random() < 0.5) {
        await message.reply({ files: [noCuss] });
        return message.channel.send(`-# be wise ${message.member.displayName}, or we square up.`);
      }
    }

    const responses = {
      // "dae": { text: "-# dae — he who remains, beyond the reach of those who seek him", video: "src/assets/react/hewhoremains.mp4" },
      "meow": { text: "-# 𝒘𝒊 𝒘𝒊 𝒘𝒊", video: "src/assets/react/wiwiwi.mp4" },
      "pastaroni": { text: "# 𝒂𝒅𝒐𝒓𝒂𝒃𝒍𝒚 𝒔𝒘𝒆𝒆𝒕\n-# Hany (하니) for sweetness,\n-# Biskit (비스킷) for the best duo—together.", video: null }
    };

    const messageContent = message.content.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (messageContent.includes(key)) {
        if (response.video) {
          await message.reply({ files: [new AttachmentBuilder(response.video)] });
          await message.channel.send(response.text);
        } else {
          await message.reply(response.text);
        }
      }
    }
  },
});
