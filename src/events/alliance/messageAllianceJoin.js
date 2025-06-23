const { WebhookClient } = require("discord.js");
require('dotenv').config();

const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_ALLIANCE });

module.exports = {
  name: "guildMemberAdd",
  async execute(client, member) {
    const allianceServerID = client.config.ancientLunaAlliance;
    if (member.guild.id !== allianceServerID) return;

    const displayName = member.displayName || member.user.username;
    const avatarUrl = member.user.displayAvatarURL({ extension: "png", dynamic: true, size: 512 });

    try {
      await webhookClient.send({
        content: '-# joined the alliance server ⓘ',
        username: `${displayName}`,
        avatarURL: avatarUrl,
      });
    } catch (err) {
      console.error("failed to forward message:", err);
    }
  }
};