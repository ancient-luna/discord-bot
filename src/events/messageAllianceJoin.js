const { WebhookClient } = require("discord.js");
require('dotenv').config();

const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_ALLIANCE });

module.exports = {
  name: "guildMemberAdd",
  async execute(client, member) {
    if (member.user.bot) return;

    const allianceServerID = client.config.ancientLunaAlliance;
    if (member.guild.id !== allianceServerID) return;

    const displayName = member.displayName || member.user.username;
    const avatarUrl = member.user.displayAvatarURL({ extension: "png", dynamic: true, size: 512 });

    try {
      await webhookClient.send({
        content: '-# <:ico_join:1374730865430495232> joined the alliance server ⓘ TacoYaki',
        username: `${displayName}`,
        avatarURL: avatarUrl,
      });
    } catch (err) {
      console.error("failed to forward message:", err);
    }
  }
};