const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, MessageFlags } = require("discord.js");
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
        title: `Confession`,
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
                // .setAuthor({ name: "confession", url: "https://discord.com/channels/447069790150852609/1162410164356390912" })
                .setTitle(`thy confessional anon`)
                .setDescription(`[<:ic_like:1334863610802995281> <:ic_repost:1334863701026541648> <:ic_share:1334863681443463169>](https://discord.com/channels/447069790150852609/1162410164356390912/1163378443287797831)\n\n${confessionValue}\n\n-# from Anonymous • [click here to confess](https://discord.com/channels/447069790150852609/1162410164356390912/1163378443287797831)`)
                .setColor(client.config.embedColorTrans)
                .setTimestamp()
            const btnConfess = new ActionRowBuilder()
              .addComponents(
                  new ButtonBuilder()
                  .setLabel("Reply")
                  .setStyle(ButtonStyle.Secondary)
                  .setEmoji("<:ico_reply:1334864405866741892>")
                  .setCustomId("btn-confessionreply")
              )
            const confessionLog = new EmbedBuilder()
                .setDescription(`<@${interaction.member.id}> just sent confession`)
                .setColor(client.config.embedColorTrans)
                .setTimestamp()
                .setFooter({ text: `(u) ${interaction.user.username}` })
            modalInteraction.guild.channels.cache.get('1162419484305391800').send({ embeds: [confessionLog] })
            modalInteraction.guild.channels.cache.get('1162416709265784882').send({ embeds: [confessionTxt], components: [btnConfess] })
            modalInteraction.reply({
              content: `Your confession sent to <#1162416709265784882>`,
              flags: MessageFlags.Ephemeral
            })
        })
        .catch((e)=> { })
  },
};