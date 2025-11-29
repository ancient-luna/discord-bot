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
  
  execute: async (client, interaction) => {
    const excludedFolders = ["blackdesert", "deadfrontier", "moderator", "suggestion"];
    const allowedCommands = ["record", "status"];

    let helpText = "";
    let specialCommands = "";

    const commandsByCategory = new Map();
    client.Commands.forEach(cmd => {
        const cat = cmd.category || 'default';
        if (!commandsByCategory.has(cat)) commandsByCategory.set(cat, []);
        commandsByCategory.get(cat).push(cmd);
    });

    for (const folder of excludedFolders) {
        if (commandsByCategory.has(folder)) {
            const cmds = commandsByCategory.get(folder).filter(cmd => allowedCommands?.includes(cmd.name));
            if (cmds.length > 0) {
                let folderSpecialCommands = "";
                for (const cmd of cmds) {
                    if (cmd.description) {
                        folderSpecialCommands += `- \`!${cmd.name}\` ${cmd.description}\n`;
                    }
                }
                if (folderSpecialCommands) {
                    specialCommands += `## ${folder.replace(/^\w/, (c) => c.toUpperCase())}\n${folderSpecialCommands}`;
                }
            }
        }
    }

    if (specialCommands) {
        helpText += specialCommands;
    }

    const sortedCategories = [...commandsByCategory.keys()].sort();
    
    for (const category of sortedCategories) {
        if (excludedFolders?.includes(category)) continue;

        const cmds = commandsByCategory.get(category);
        if (cmds.length > 0) {
            helpText += `## ${category.replace(/^\w/, (c) => c.toUpperCase())}\n`;
            for (const cmd of cmds) {
                if (cmd.description) {
                    helpText += `- \`!${cmd.name}\` ${cmd.description}\n`;
                }
            }
        }
    }

    const slashCommandsDir = join(__dirname, "../commands/slash");
    if (existsSync(slashCommandsDir)) {
      const slashCategories = readdirSync(slashCommandsDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

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