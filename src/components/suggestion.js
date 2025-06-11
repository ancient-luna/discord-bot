const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, MessageFlags } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "suggestion",
  id: "btn-suggestion",
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
        customId: `suggestion-${interaction.user.id}`,
        title: `Ancient Luna Community`,
    })

    const suggestInput = new TextInputBuilder({
        customId: 'suggestInput',
        label: 'Any Suggestions or Feedbacks?',
        style: TextInputStyle.Paragraph,
        required: true,
        maxLength: 666,
        placeholder: 'Maybe like.. the ancestor need to stay awake 24/7',
    })

    const firstRow = new ActionRowBuilder().addComponents(suggestInput)

    txtModal.addComponents(firstRow)
        
    await interaction.showModal(txtModal);

    // Wait for modal to be submitted
    const filter = (interaction) => interaction.customId === `suggestion-${interaction.user.id}`;

    interaction
        .awaitModalSubmit({ filter, time: 300_000 })
        .then((modalInteraction) => {
            const suggestValue = modalInteraction.fields.getTextInputValue('suggestInput');
            const suggestNote = new EmbedBuilder()
                .setAuthor({ name: `${interaction.member.user.username}` })
                .setDescription(`${suggestValue}`)
                .setColor('4f545c')
            modalInteraction.guild.channels.cache.get('842069893113446410').send({ embeds: [suggestNote] }).then((msg) => {
                msg.react('<:ic_like:1334863610802995281>')
                msg.react('<:ic_dislike:1334863630864351322>')
              }).catch((e) => { });
            modalInteraction.reply({ content: `Suggestion sent to <#842069893113446410>`, flags: MessageFlags.Ephemeral }).catch((e) => { });
        })
        .catch((e)=> { console.log(e) })
  },
};
