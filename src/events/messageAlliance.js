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
    body = body
      .replace(/@everyone/g, "`@everyone`")
      .replace(/@here/g, "`@here`")
      .replace(/<@!?(\d+)>/g, "`@user`")
      .replace(/<@&(\d+)>/g, "`@role`");
    if (!body && message.attachments.size === 0) return;

    const content = `${body}`;

    try {
      const sent = await webhookClient.send({
        content,
        username: `${displayName} ✦ #${channelName} ✦`,
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