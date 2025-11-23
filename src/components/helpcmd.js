const { EmbedBuilder, MessageFlags, ContainerBuilder, TextDisplayBuilder } = require("discord.js");
const { readdirSync, existsSync } = require("fs");
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
    const excludedFolders = ["blackdesert", "deadfrontier", "moderator", "suggestion", "unused-setup"];
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

    // Slash Commands
    const slashCommandsDir = join(__dirname, "../commands/slash");
    if (existsSync(slashCommandsDir)) {
      const slashCategories = readdirSync(slashCommandsDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

      // Ensure commands are fetched
      const applicationCommands = client.application.commands.cache.size > 0 
        ? client.application.commands.cache 
        : await client.application.commands.fetch();

      for (const category of slashCategories) {
        const categoryPath = join(slashCommandsDir, category);
        const commandFiles = readdirSync(categoryPath).filter((file) => file.endsWith(".js"));

        let categoryHelp = "";
        for (const file of commandFiles) {
          const command = require(join(categoryPath, file));
          if (command?.data?.name && command?.data?.description) {
            const cmdName = command.data.name;
            const cmdId = applicationCommands.find(c => c.name === cmdName)?.id;
            
            const cmdData = command.data.toJSON();
            const subcommands = cmdData.options?.filter(opt => opt.type === 1);

            if (subcommands && subcommands.length > 0) {
              for (const sub of subcommands) {
                const cmdDisplay = cmdId ? `</${cmdName} ${sub.name}:${cmdId}>` : `\`/${cmdName} ${sub.name}\``;
                categoryHelp += `- ${cmdDisplay} ${sub.description}\n`;
              }
            } else {
              const cmdDisplay = cmdId ? `</${cmdName}:${cmdId}>` : `\`/${cmdName}\``;
              categoryHelp += `- ${cmdDisplay} ${command.data.description}\n`;
            }
          }
        }
        
        if (categoryHelp) {
           helpText += `## [/] ${category.replace(/^\w/, (c) => c.toUpperCase())}\n${categoryHelp}`;
        }
      }
    }

    if (!helpText) {
      helpText = "No commands found.";
    }

    const helpDetail = new TextDisplayBuilder().setContent(helpText.trim())

    return interaction.reply({
      flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
      components: [helpDetail]
    });
  },
};