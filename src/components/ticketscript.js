const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
const { stripIndent } = require("common-tags");
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
  name: "ticketscript",
  id: "btn-ticketscript",
  permissions: {
    client: [],
    user: ['ManageMessages'],
    dev: false,
  },
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  execute: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return await interaction.reply({ content: `Only the **Ancestor** and **Elders** can save this ticket`, ephemeral: true })
    // const channel = interaction.channel;
    const attachment = await discordTranscripts.createTranscript(channel);
    // interaction.channel.send({ files: [attachment] })
    interaction.reply({
        content: `<:ancientluna_divinare_s:859034096192978965> \`here is the transcripted chat log\``,
        files: [attachment],
        ephemeral: true
    });
  },
};
