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

    const content = message.content.toLowerCase();

    const bannedWords = ["fuck", "cunt", "dick"];
    if (bannedWords.some((word) => content.includes(word)) && Math.random() < 0.2) {
      const noCuss = new AttachmentBuilder('src/assets/react/nocussnuuh.mp4');
      await message.reply({ files: [noCuss] });
      return message.channel.send(`-# be wise ${message.member.displayName}, or we square up.`);
    }

    const responses = {
      "bitch": { text: `-# **move**.. bihs, ${message.member.displayName}`, video: "src/assets/react/bih.mp4", chance: 0.2 },
      "dae": { text: "-# dae — he who remains, beyond the reach of those who seek him", video: "src/assets/react/hewhoremains.mp4", chance: 0.5 },
      "pastaroni": { text: "# 𝒂𝒅𝒐𝒓𝒂𝒃𝒍𝒚 𝒔𝒘𝒆𝒆𝒕\n-# Hany (하니) for sweetness,\n-# Biskit (비스킷) for the best duo—together.", video: null, chance: 1 }
    };

    for (const [key, response] of Object.entries(responses)) {
      if (content.includes(key) && Math.random() < response.chance) {
        if (response.video) {
          await message.reply({ files: [new AttachmentBuilder(response.video)] });
          await message.channel.send(response.text);
        } else {
          await message.reply(response.text);
        }
      }
      break;
    }
  },
});
