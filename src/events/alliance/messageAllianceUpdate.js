const { WebhookClient } = require("discord.js");
require('dotenv').config();

const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_ALLIANCE });

module.exports = {
  name: "messageUpdate",
  async execute(client, oldMessage, newMessage) {
    // if (newMessage.author?.bot) return;
    if (newMessage.guild?.id !== client.config.ancientLunaAlliance) return;

    const webhookMessageId = await client.db.get(`mirror_${newMessage.id}`);
    if (!webhookMessageId) return;

    let body = newMessage.content?.trim() || "[edited]";

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
              return `[☺](https://cdn.discordapp.com/emojis/${m[1]}.${ext}?size=48)`;
            }).join(" ");
        }
      } else {
        body = body.replace(emojiRegex, (match, id) => {
          const isAnimated = match.startsWith("<a:");
          const ext = isAnimated ? "gif" : "png";
          const name = match.split(":")[1];
          return `[☺](https://cdn.discordapp.com/emojis/${id}.${ext}?size=48)`;
        });
      }
    }

    const embedData = newMessage.embeds?.map(embed => embed.toJSON()) || [];

    try {
      await webhookClient.editMessage(webhookMessageId, {
        content: body,
        embeds: embedData,
        allowedMentions: { parse: [] },
      });
    } catch (err) {
      console.error("failed to edit message:", err);
    }
  }
};