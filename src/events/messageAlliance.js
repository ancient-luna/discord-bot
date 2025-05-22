const { WebhookClient } = require("discord.js");
require('dotenv').config();

const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_ALLIANCE });

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (message.author.bot) return;

    const allianceServerID = client.config.ancientLunaAlliance;
    if (message.guild?.id !== allianceServerID) return;

    const channelName = message.channel.name;

    const member = await message.guild.members.fetch(message.author.id).catch(() => {});
    const displayName = member?.displayName || message.author.username;
    const avatarUrl = message.author.displayAvatarURL({ extension: "png", dynamic: true, size: 512 });

    let body = message.content?.trim() || "";

    const emojiRegex = /<a?:\w+:(\d+)>/g;
    const emojiMatches = [...body.matchAll(emojiRegex)];

    if (emojiMatches.length) {
      const parts = body.split(emojiRegex);
      if (parts.join("").trim() === "") {
        if (emojiMatches.length === 1) {
          body = `https://cdn.discordapp.com/emojis/${emojiMatches[0][1]}.png`;
        } else {
          body = emojiMatches.map(m => `[\`${m[0].split(":")[1]}\`](https://cdn.discordapp.com/emojis/${m[1]}.png)`).join(" ");
        }
      } else {
        body = body.replace(emojiRegex, (match, id) => {
          const name = match.split(":")[1];
          return `[\`${name}\`](https://cdn.discordapp.com/emojis/${id}.png)`;
        });
      }
    }
    
    if (message.stickers.size) body = message.stickers.first().url;

    if (!body && message.attachments.size === 0) return;

    try {
      const sent = await webhookClient.send({
        content: body,
        username: `${displayName} ・ #${channelName}`,
        avatarURL: avatarUrl,
        files: message.attachments.map(att => att),
        allowedMentions: { parse: [] },
      });
      await client.db.set(`mirror_${message.id}`, sent.id);
    } catch (err) {
      console.error("failed to forward message:", err);
    }
  }
};