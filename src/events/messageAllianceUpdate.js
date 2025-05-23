const { WebhookClient } = require("discord.js");
require('dotenv').config();

const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_ALLIANCE });

module.exports = {
  name: "messageUpdate",
  async execute(client, oldMessage, newMessage) {
    if (newMessage.author?.bot) return;
    if (newMessage.guild?.id !== client.config.ancientLunaAlliance) return;

    const webhookMessageId = await client.db.get(`mirror_${newMessage.id}`);
    if (!webhookMessageId) return;

    let body = newMessage.content?.trim() || "[edited]";

    const emojiNameRegex = /:([a-zA-Z0-9_]+):/g;
    body = body.replace(emojiNameRegex, (match, name) => {
      const emoji = client.emojis.cache.find(e => e.name === name);
      if (!emoji) return match;
      return `<${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}>`;
    });

    try {
      await webhookClient.editMessage(webhookMessageId, {
        content: body,
        allowedMentions: { parse: [] },
      });
    } catch (err) {
      console.error("failed to edit message:", err);
    }
  }
};