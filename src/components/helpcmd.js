const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = {
  name: "helpcmd",
  id: "btn-helpcmd",
  permissions: {
    client: [],
    user: [],
    dev: false,
  },
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  execute: async (client, interaction) => {
    const commandsDir = join(__dirname, "../commands/message");
    const excludedFolders = ["blackdesert", "deadfrontier", "fortnite", "moderator", "suggestion", "unused-setup"];
    const allowedCommands = ["record", "status"];

    const categories = readdirSync(commandsDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    let helpText = "";
    let specialCommands = "";

    for (const excludedFolder of excludedFolders) {
      const excludedPath = join(commandsDir, excludedFolder);
      const commandFiles = readdirSync(excludedPath).filter((file) => file.endsWith(".js"));

      let folderSpecialCommands = "";
      for (const file of commandFiles) {
        const command = require(join(excludedPath, file));
        if (command.name && command.description && allowedCommands.includes(command.name)) {
          folderSpecialCommands += `- \`!${command.name}\` ${command.description}\n`;
        }
      }

      if (folderSpecialCommands) {
        specialCommands += `## ${excludedFolder.replace(/^\w/, (c) => c.toUpperCase())}\n${folderSpecialCommands}`;
      }
    }

    if (specialCommands) {
      helpText += specialCommands;
    }

    for (const category of categories) {
      if (excludedFolders.includes(category)) {
        continue;
      }

      const categoryPath = join(commandsDir, category);
      const commandFiles = readdirSync(categoryPath).filter((file) => file.endsWith(".js"));

      helpText += `## ${category.replace(/^\w/, (c) => c.toUpperCase())}\n`;

      for (const file of commandFiles) {
        const command = require(join(categoryPath, file));
        if (command.name && command.description) {
          helpText += `- \`!${command.name}\` ${command.description}\n`;
        }
      }
    }

    if (!helpText) {
      helpText = "No commands found.";
    }

    const embed = new EmbedBuilder()
      .setTitle("Help Command")
      .setDescription(helpText.trim())
      .setColor(client.config.embedColorTrans)
      .setTimestamp();

    return interaction.reply({
      content: `${helpText.trim()}`,
      // embeds: [embed],
      ephemeral: true,
    });
  },
};