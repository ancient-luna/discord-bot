const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "confession",
  id: "btn-confession",
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
        customId: `confession-${interaction.user.id}`,
        title: `Confession (Anonymously)`,
    })

    const confessionInput = new TextInputBuilder({
        customId: 'confessionInput',
        label: 'Your secret confession',
        style: TextInputStyle.Paragraph,
        required: true,
        maxLength: 666,
        placeholder: '(!) Just do not harass anyone',
    })

    const firstRow = new ActionRowBuilder().addComponents(confessionInput)

    txtModal.addComponents(firstRow)
        
    await interaction.showModal(txtModal);

    // Wait for modal to be submitted
    const filter = (interaction) => interaction.customId === `confession-${interaction.user.id}`;

    interaction
        .awaitModalSubmit({ filter, time: 300_000 })
        .then((modalInteraction) => {
            const confessionValue = modalInteraction.fields.getTextInputValue('confessionInput');
            const confessionTxt = new EmbedBuilder()
                .setAuthor({ name: "confession" })
                .setDescription(`*" ${confessionValue} "*`)
                .setColor('2b2d31')
                .setTimestamp()
                .setFooter({ text: 'from Anonymous' })
            // const btnConfess = new ActionRowBuilder()
            //   .addComponents(
            //       new ButtonBuilder()
            //       .setCustomId("btn-confession")
            //       .setLabel("Confess")
            //       .setStyle(ButtonStyle.Primary)
            //   )
            const confessionEmbed = new EmbedBuilder()
                .setDescription(`<@{${interaction.member.id}}> (***${interaction.member.displayName}***) just sent confession`)
                .setColor('2b2d31')
                .setTimestamp()
            modalInteraction.guild.channels.cache.get('1162419484305391800').send({ embeds: [confessionEmbed] })
            modalInteraction.channel.send({ embeds: [confessionTxt] })
            modalInteraction.reply({
              content: `Your confession sent to <#1162416709265784882>`,
              ephemeral: true
            })
        })
        .catch((e)=> { console.log(e) })
  },
};
