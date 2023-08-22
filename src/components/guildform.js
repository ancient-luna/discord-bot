const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "guildform",
  id: "btn-guildform",
  permissions: {
    client: [],
    user: [],
    dev: false,
  },
  /**
   * @param {import("../index")} client
   * @param {import("discord.js").ButtonInteraction} interaction
     * @param {import("discord.js").Message} message
   */
  execute: async (client, interaction, message) => {

    const txtModal = new ModalBuilder({
        customId: `gForm-${interaction.user.id}`,
        title: `Guild Application Form`,
    })

    const famName = new TextInputBuilder({
        customId: 'famName',
        label: 'Family Name',
        style: TextInputStyle.Short,
        required: true,
        placeholder: 'Family name in game (above character name)',
    })

    const countryLoct = new TextInputBuilder({
        customId: 'countryLoct',
        label: 'Country',
        style: TextInputStyle.Short,
        required: true,
        placeholder: 'The country name where your current live now',
    })

    const prevGuild = new TextInputBuilder({
        customId: 'prevGuild',
        label: 'Previous Guild History',
        style: TextInputStyle.Paragraph,
        required: true,
        maxLength: 666,
        placeholder: 'Previous guild name and reason of leaving',
    })

    const expectGuild = new TextInputBuilder({
        customId: 'expectGuild',
        label: 'Guild expectation',
        style: TextInputStyle.Paragraph,
        required: true,
        maxLength: 666,
        placeholder: 'Your expectation from Ancient Luna (reason to join)',
    })

    const termsAgreement = new TextInputBuilder({
        customId: 'termsAgreement',
        label: 'Are you able to comply with the guild rules?',
        style: TextInputStyle.Short,
        required: true,
        placeholder: '"Yes, I Agree"',
    })

    const firstRow = new ActionRowBuilder().addComponents(famName)
    const secondRow = new ActionRowBuilder().addComponents(countryLoct)
    const thirdRow = new ActionRowBuilder().addComponents(prevGuild)
    const forthRow = new ActionRowBuilder().addComponents(expectGuild)
    const fifthRow = new ActionRowBuilder().addComponents(termsAgreement)

    txtModal.addComponents(firstRow, secondRow, thirdRow, forthRow, fifthRow)
        
    await interaction.showModal(txtModal);

    // Wait for modal to be submitted
    const filter = (interaction) => interaction.customId === `gForm-${interaction.user.id}`;

    interaction
        .awaitModalSubmit({ filter, time: 180_000 })
        .then((modalInteraction) => {
            const famName = modalInteraction.fields.getTextInputValue('famName');
            const countryLoct = modalInteraction.fields.getTextInputValue('countryLoct');
            const prevGuild = modalInteraction.fields.getTextInputValue('prevGuild');
            const expectGuild = modalInteraction.fields.getTextInputValue('expectGuild');
            const termsAgreement = modalInteraction.fields.getTextInputValue('termsAgreement');

            const embedForm = new EmbedBuilder()
                .setAuthor({ name: `${interaction.member.displayName}'s Guild Application Form`, iconURL: "https://i.imgur.com/Kll2T98.png" })
                .addFields(
                    { name: `Family Name`, value: `\`\`\`${famName}\`\`\``, inline: true },
                    { name: `Country`, value: `\`\`\`${countryLoct}\`\`\``, inline: true },
                    { name: `Rules Agreement`, value: `\`\`\`${termsAgreement}\`\`\``, inline: true },
                    { name: `Previous Guild History`, value: `> ${prevGuild}`, inline: false },
                    { name: `Guild Expectation`, value: `> ${expectGuild}`, inline: false },
                )
                .setColor('2b2d31')
                // .setTimestamp()
            modalInteraction.reply({ embeds: [embedForm] })
        })
        .catch((e)=> { console.log(e) })
  },
};
