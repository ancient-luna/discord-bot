const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("automod")
    .setDescription("Setup auto moderation rules")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((c) => c
        .setName("spammessages").setDescription("Prevent spam messages")
    )
    .addSubcommand((c) => c
        .setName("spammentions")
        .setDescription("Prevent mention spam")
        .addIntegerOption((o) => o
            .setName("number")
            .setDescription("Mention limit before triggering")
            .setRequired(true)
        )
    )
    .addSubcommand((c) => c
        .setName("keywords")
        .setDescription("Block specific keywords")
        .addStringOption((o) => o
            .setName("word")
            .setDescription("The keyword to block")
            .setRequired(true)
        )
    )
    .addSubcommand((c) => c
        .setName("flaggedwords")
        .setDescription("Block swears, slurs, and sexual content")
    ),

  cooldown: 5,

  async execute(client, interaction) {
    const sub = interaction.options.getSubcommand();
    const color = client.config.embedColorTrans;
    const acceptedIcon = "<:srv_accepted:1334885365676507188>";
    const metadata = {
      channel: interaction.channel,
      durationSeconds: 10,
      customMessage:
        "This message was prevented by Ancient Luna auto moderation",
    };

    const replyEmbed = (desc) =>
      new EmbedBuilder()
        .setColor(color)
        .setDescription(`${acceptedIcon} ${desc}`);

    try {
      if (sub === "spammessages") {
        await interaction.guild.autoModerationRules.create({
          name: "Prevent spam messages by Ancient Luna",
          creatorId: client.user.id,
          enabled: true,
          eventType: 1,
          triggerType: 3,
          actions: [{ type: 1, metadata }],
        });

        await interaction.reply({ embeds: [replyEmbed("**AUTOMOD RULE CREATED**\n-# Spam messages will be deleted.")] });
      }

      if (sub === "spammentions") {
        const number = interaction.options.getInteger("number");

        await interaction.guild.autoModerationRules.create({
          name: "Prevent spam mentions by Ancient Luna",
          creatorId: client.user.id,
          enabled: true,
          eventType: 1,
          triggerType: 5,
          triggerMetadata: { mentionTotalLimit: number },
          actions: [{ type: 1, metadata }],
        });

        await interaction.reply({ embeds: [replyEmbed(`**AUTOMOD RULE CREATED**\n-# Mention spam (${number}+ pings) will be deleted.`)] });
      }

      if (sub === "keywords") {
        const word = interaction.options.getString("word");

        await interaction.guild.autoModerationRules.create({
          name: `Block keyword "${word}" by Ancient Luna`,
          creatorId: client.user.id,
          enabled: true,
          eventType: 1,
          triggerType: 1,
          triggerMetadata: { keywordFilter: [word] },
          actions: [{ type: 1, metadata }],
        });

        await interaction.reply({ embeds: [replyEmbed(`**AUTOMOD RULE CREATED**\n-# Messages containing \`${word}\` will be deleted.`)] });
      }

      if (sub === "flaggedwords") {
        await interaction.guild.autoModerationRules.create({
          name: "Block flagged words by Ancient Luna",
          creatorId: client.user.id,
          enabled: true,
          eventType: 1,
          triggerType: 4,
          triggerMetadata: { presets: [1, 2, 3] }, // 1: profanity, 2: sexual, 3: slurs
          actions: [{ type: 1, metadata }],
        });

        await interaction.reply({ embeds: [replyEmbed("**AUTOMOD RULE CREATED**\n-# Swears, slurs, and sexual content will be blocked.")] });
      }
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: `<:srv_denied:1334885383636521050> Failed to create auto moderation rule:\n-# \`\`\`${err}\`\`\``,
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};