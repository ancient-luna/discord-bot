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
    body = body
      .replace(/@everyone/g, "`@everyone`")
      .replace(/@here/g, "`@here`")
      .replace(/<@!?(\d+)>/g, "`@user`")
      .replace(/<@&(\d+)>/g, "`@role`");

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