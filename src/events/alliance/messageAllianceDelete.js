const { WebhookClient } = require("discord.js");
require('dotenv').config();

const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_ALLIANCE });

module.exports = {
  name: "messageDelete",
  async execute(client, message) {
    if (message.guild?.id !== client.config.ancientLunaAlliance) return;
    const webhookMessageId = await client.db.get(`mirror_${message.id}`);
    if (!webhookMessageId) return;
    try {
      await webhookClient.editMessage(webhookMessageId, {
        content: "[message deleted]",
        embeds: [],
        components: [],
        files: [],
      });
      await client.db.delete(`mirror_${message.id}`);
    } catch (err) {
      console.error("failed to mark message as deleted:", err);
    }
  }
};