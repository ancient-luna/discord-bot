const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "guildvacation",
  id: "btn-guildvacation",
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
        customId: `vacLetter-${interaction.user.id}`,
        title: `Vacation Letter`,
    })

    const dayInput = new TextInputBuilder({
        customId: 'dayInput',
        label: 'How long (in Days)',
        style: TextInputStyle.Short,
        required: true,
        maxLength: 2,
        placeholder: '30',
    })

    const reasonInput = new TextInputBuilder({
        customId: 'reasonInput',
        label: 'Reason',
        style: TextInputStyle.Paragraph,
        required: true,
        maxLength: 666,
        placeholder: 'What happened? Dont go for too long to buy a milk! Gonna miss you',
    })

    const firstRow = new ActionRowBuilder().addComponents(dayInput)
    const secondRow = new ActionRowBuilder().addComponents(reasonInput)

    txtModal.addComponents(firstRow, secondRow)
        
    await interaction.showModal(txtModal);

    // Wait for modal to be submitted
    const filter = (interaction) => interaction.customId === `vacLetter-${interaction.user.id}`;

    interaction
        .awaitModalSubmit({ filter, time: 180_000 })
        .then((modalInteraction) => {
            const dayValue = modalInteraction.fields.getTextInputValue('dayInput');
            const reasonValue = modalInteraction.fields.getTextInputValue('reasonInput');
            const absenceNote = new EmbedBuilder()
                .setTitle(`Vacation Letter`)
                .setDescription(`*Dear Elders,\nRequested Day Off: ${dayValue} Days\n\n${reasonValue}\n\nYours sincerely,*\n***${interaction.member.displayName}***`)
                .setColor(client.config.embedColorTrans)
                .setThumbnail('https://i.imgur.com/Zx4kMoA.png')
          const btnVacaAcc = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setStyle(ButtonStyle.Success)
                .setCustomId("btn-guildvacationacc")
                .setLabel(`Approve`)
            )
            modalInteraction.guild.channels.cache.get('1076767724224659526').send({ embeds: [absenceNote], components: [btnVacaAcc] })
            modalInteraction.reply({
              content: `*The vacation letter has been delivered to the Elders, dear* ***${interaction.member.displayName}***\n*All your privacy will be kept safe under them*`,
              ephemeral: true
            })
        })
        .catch((e)=> { console.log(e) })
  },
};
