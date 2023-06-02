const { PermissionsBitField } = require("discord.js");

module.exports = new Object({
  name: "ButtonInteraction",
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  async execute(client, interaction) {
    const button = client.ButtonInt.get(interaction.customId);
    if (!button) return;
    const color = client.color;
    if (button.permissions) {
      if (button.permissions.client) {
        if (
          !interaction.guild.members.cache
            .get(client.user.id)
            .permissionsIn(interaction.channel)
            .has(PermissionsBitField.resolve(button.permissions.client) || [])
        )
          return await interaction.reply({
            content: `I don't have \`${button.permissions.client}\` permission to execute this button.`,
            ephemeral: true,
          });
      }
      if (button.permissions.user) {
        if (
          !interaction.guild.members.cache
            .get(interaction.member.user.id)
            .permissionsIn(interaction.channel)
            .has(PermissionsBitField.resolve(button.permissions.user) || [])
        )
          return await interaction.reply({
            content: `You don't have \`${button.permissions.user}\` permission to use this button.`,
            ephemeral: true,
          });
      }
      if (button.permissions.dev) {
        if (client.owners) {
          const findDev = client.owners.find(
            (x) => x === interaction.member.user.id
          );
          if (!findDev)
            return interaction.reply({
              content: `Sorry! This is a owner based command you cant use it.`,
              ephemeral: true,
            });
        }
      }
    }
    try {
      await button.execute(client, interaction, color);
    } catch (error) {
      console.error(error);
    }
  },
});
