const { InteractionType } = require("discord.js");
const { commandHandler } = require("../handlers/index");

module.exports = new Object({
  name: "interactionCreate",

  /**
   * @param {import("../")} client
   * @param {import('discord.js').CommandInteraction} interaction
   */

  async execute(client, interaction) {
    if (interaction.isButton()) {
      client.emit("ButtonInteraction", interaction);
    }
    if (interaction.isChatInputCommand()) {
      await commandHandler.handleSlashCommand(interaction);
    }
    if (!interaction.isModalSubmit() && !interaction.isStringSelectMenu())
      return;
  },
});
