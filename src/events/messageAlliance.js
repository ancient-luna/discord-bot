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
          const isAnimated = emojiMatches[0][0].startsWith("<a:");
          const ext = isAnimated ? "gif" : "png";
          body = `https://cdn.discordapp.com/emojis/${emojiMatches[0][1]}.${ext}?size=48`;
        } else {
          body = emojiMatches.map(m => {
              const isAnimated = m[0].startsWith("<a:");
              const ext = isAnimated ? "gif" : "png";
              return `[ⓘ](https://cdn.discordapp.com/emojis/${m[1]}.${ext}?size=48)`;
            }).join(" ");
        }
      } else {
        body = body.replace(emojiRegex, (match, id) => {
          const isAnimated = match.startsWith("<a:");
          const ext = isAnimated ? "gif" : "png";
          const name = match.split(":")[1];
          return `[ⓘ](https://cdn.discordapp.com/emojis/${id}.${ext}?size=48)`;
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