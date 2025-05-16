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

    try {
      await webhookClient.editMessage(webhookMessageId, {
        content: newMessage.content?.trim() || "[edited]",
      });
    } catch (err) {
      console.error("failed to edit message:", err);
    }
  }
};