const { WebhookClient } = require("discord.js");
require('dotenv').config();

const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_ALLIANCE });

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (message.author.bot) return;

    const allianceServerID = client.config.ancientLunaAlliance;
    if (message.guild?.id !== allianceServerID) return;

    const member = await message.guild.members.fetch(message.author.id).catch(() => {});
    const displayName = member?.displayName || message.author.username;
    const avatarUrl = message.author.displayAvatarURL({ extension: "png", dynamic: true, size: 512 });

    const body = message.content?.trim() || "";
    if (!body && message.attachments.size === 0) return;

    const content = `**#${message.channel.name}:** ${body}`;

    try {
      await webhookClient.send({
        content,
        username: displayName,
        avatarURL: avatarUrl,
        files: message.attachments.map(att => att),
      });
    } catch (err) {
      console.error("❌ Failed to forward message:", err);
    }
  }
};