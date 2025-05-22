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

    const emojiRegex = /<(a?):(\w+):(\d+)>/g;
    body = body.replace(emojiRegex, (match, animated, name, id) => {
      const emoji = client.emojis.cache.get(id);
      if (emoji) return emoji.toString();
      const ext = animated ? "gif" : "png";
      return `[\`${name}\`](https://cdn.discordapp.com/emojis/${id}.${ext})`;
    });

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