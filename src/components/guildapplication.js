const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "guildapplication",
  id: "btn-guildapplication",
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

    const thread = await interaction.channel.threads.create({
        name: `${interaction.member.displayName} Guild Application`,
        autoArchiveDuration: 60,
        type: ChannelType.PrivateThread,
    }).catch(err => {
        return;
    });

    const threadID = thread.id;
    const ThreadSend = client.channels.cache.get(`${threadID}`);

    const embedForm = new EmbedBuilder()
      .setAuthor({ name: "Ancient Luna Guild Application", iconURL: "https://i.imgur.com/SOCuup9.png" })
      .setDescription(`Welcome to the sanctuary of lights\n**To apply for guild, please answer these questions and post it here:**\n- Family name in game\n- Name of your previous guild and why you left\n- Your expectation from Ancient Luna guild (your needed)\n- Country where you stay\n- Are you able to comply with the guild rules?`)
      .setColor("2b2d31")
      .setFooter({ text: "Hopefully we can be one of the family!" })

    const btnTerms = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("btn-guildterms")
          .setLabel("Read Guild Terms")
          .setStyle(ButtonStyle.Primary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("btn-guildmention")
          .setLabel("Mention Now")
          .setStyle(ButtonStyle.Secondary)
      )

    ThreadSend.send({
        content: `<@${interaction.user.id}> <@&1076513302970109985> <@&1076513338361643068> <@&1076513211391688735> <@&1076513403364966440> <@&1076513372461334530> <:ancientluna_divinare:841754250949820416>`
    }).catch(err => {
        return;
    })

    ThreadSend.send({
        content: `_ _`,
        embeds: [embedForm],
        components: [btnTerms]
    }).catch(err => {
        return;
    })
    
    return interaction.reply({
        content: `Please go to <#${threadID}> to continue`,
        ephemeral: true,
    });
  },
};
