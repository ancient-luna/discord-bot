const { EmbedBuilder } = require("discord.js");
const { } = require("../config/config");
const { parsePermissions } = require("../utils/Utils");
const { timeformat } = require("../utils/Utils");
const cooldownCache = new Map();


module.exports = {
    /**
     * @param {import('discord.js').Message} message
     * @param {import("../structures/Command")} cmd
     */
    handlePrefixCommand: async function (message, cmd) {
        const prefix = process.env.COMMAND_PREFIX;
        const args = message.content.replace(prefix, "").split(/\s+/);
        const invoke = args.shift().toLowerCase();

        const data = {};
        data.prefix = prefix;
        data.invoke = invoke;

        if (!message.channel.permissionsFor(message.guild.members.me).has("SendMessages")) return;

        // check user permissions
        if (cmd.userPermissions && cmd.userPermissions?.length > 0) {
            if (!message.channel.permissionsFor(message.member).has(cmd.userPermissions)) {
                return message.safeReply(`You need ${parsePermissions(cmd.userPermissions)} for this command`);
            }
        }

        // check bot permissions
        if (cmd.botPermissions && cmd.botPermissions.length > 0) {
            if (!message.channel.permissionsFor(message.guild.members.me).has(cmd.botPermissions)) {
                return message.safeReply(`I need ${parsePermissions(cmd.botPermissions)} for this command`);
            }
        }

        // minArgs count
        if (cmd.command.minArgsCount > args.length) {
            const usageEmbed = this.getCommandUsage(cmd, prefix, invoke);
            return message.safeReply({ embeds: [usageEmbed] });
        }

        // cooldown check
        if (cmd.cooldown > 0) {
            const remaining = getRemainingCooldown(message.author.id, cmd);
            if (remaining > 0) {
                let embed = new EmbedBuilder()
                    .setDescription(`Cooldown: \`${timeformat(remaining)}\``)
                return message.safeReply({ embeds: [embed] });
            }
        }

        try {
            await cmd.messageRun(message, args, data);
        } catch (ex) {
            message.client.logger.error("messageRun", ex);
            message.safeReply("An error occurred while running this command");
        } finally {
            if (cmd.cooldown > 0) applyCooldown(message.author.id, cmd);
        }
    },

    /**
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    handleSlashCommand: async function (interaction) {
        const cmd = interaction.client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.reply({ content: "An error has occurred", ephemeral: true }).catch(() => { });

        // user permissions
        if (interaction.member && cmd.userPermissions?.length > 0) {
            if (!interaction.member.permissions.has(cmd.userPermissions)) {
                return interaction.reply({
                    content: `You need ${parsePermissions(cmd.userPermissions)} for this command`,
                    ephemeral: true,
                });
            }
        }

        // bot permissions
        if (cmd.botPermissions && cmd.botPermissions.length > 0) {
            if (!interaction.guild.members.me.permissions.has(cmd.botPermissions)) {
                return interaction.reply({
                    content: `I need ${parsePermissions(cmd.botPermissions)} for this command`,
                    ephemeral: true,
                });
            }
        }

        // cooldown check
        if (cmd.cooldown > 0) {
            const remaining = getRemainingCooldown(interaction.user.id, cmd);
            if (remaining > 0) {
                return interaction.reply({
                    content: `Cooldown: \`${timeformat(remaining)}\``,
                    ephemeral: true,
                });
            }
        }

        try {
            await interaction.deferReply({ ephemeral: cmd.slashCommand.ephemeral });
            await cmd.interactionRun(interaction);
        } catch (ex) {
            await interaction.followUp("Oops! An error occurred while running the command");
            interaction.client.logger.error("interactionRun", ex);
        } finally {
            if (cmd.cooldown > 0) applyCooldown(interaction.user.id, cmd);
        }
    },

    /**
     * Build a usage embed for this command
     * @param {import('@structures/Command')} cmd - command object
     * @param {string} prefix - guild bot prefix
     * @param {string} invoke - alias that was used to trigger this command
     * @param {string} [title] - the embed title
     */
    getCommandUsage(cmd, prefix, invoke, title = "Usage") {
        let desc = "";
        if (cmd.command.subcommands && cmd.command.subcommands.length > 0) {
            cmd.command.subcommands.forEach((sub) => {
                desc += `\`${prefix}${invoke || cmd.name} ${sub.trigger}\`\n❯ ${sub.description}\n\n`;
            });
            if (cmd.cooldown) {
                desc += `**Cooldown:** ${timeformat(cmd.cooldown)}`;
            }
        } else {
            desc += `\`\`\`css\n${cmd.command.usage}\`\`\``;
            if (cmd.description !== "") desc += `\n**Help:** ${cmd.description}`;
            if (cmd.cooldown) desc += `\n**Cooldown:** ${timeformat(cmd.cooldown)}`;
        }

        const embed = new EmbedBuilder().setDescription(desc);
        if (title) embed.setAuthor({ name: title });
        return embed;
    },

    /**
     * @param {import('@structures/Command')} cmd - command object
     */
    getSlashUsage(cmd) {
        let desc = "";
        if (cmd.slashCommand.options.find((o) => o.type === "SUB_COMMAND")) {
            const subCmds = cmd.slashCommand.options.filter((opt) => opt.type === "SUB_COMMAND");
            subCmds.forEach((sub) => {
                desc += `\`/${cmd.name} ${sub.name}\`\n❯ ${sub.description}\n\n`;
            });
        } else {
            desc += `\`/${cmd.name}\`\n\n**Help:** ${cmd.description}`;
        }

        if (cmd.cooldown) {
            desc += `\n**Cooldown:** ${timeformat(cmd.cooldown)}`;
        }

        return new EmbedBuilder().setDescription(desc);
    },
};

/**
 * @param {string} memberId
 * @param {object} cmd
 */
function applyCooldown(memberId, cmd) {
    const key = cmd.name + "|" + memberId;
    cooldownCache.set(key, Date.now());
}

/**
 * @param {string} memberId
 * @param {object} cmd
 */
function getRemainingCooldown(memberId, cmd) {
    const key = cmd.name + "|" + memberId;
    if (cooldownCache.has(key)) {
        const remaining = (Date.now() - cooldownCache.get(key)) * 0.001;
        if (remaining > cmd.cooldown) {
            cooldownCache.delete(key);
            return 0;
        }
        return cmd.cooldown - remaining;
    }
    return 0;
}