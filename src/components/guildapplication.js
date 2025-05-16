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
        autoArchiveDuration: 1440,
        type: ChannelType.PrivateThread,
    }).catch(err => {
        return;
    });

    const threadID = thread.id;
    const ThreadSend = client.channels.cache.get(`${threadID}`);

    const embedForm = new EmbedBuilder()
      .setAuthor({ name: "Ancient Luna Guild Application", iconURL: "https://i.imgur.com/SOCuup9.png" })
      .setTitle(`Welcome to the sanctuary of lights`)
      .setURL(`https://ancientluna.org`)
      .setDescription(`**To apply for guild, please fill the form by clicking the button below**\nDon't hesitate to ask if there is any questions regarding the guild`)
      .setColor(client.config.embedColorTrans)
      .setFooter({ text: "Hopefully we can be one of the family!" })

    const btnTerms = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("btn-guildterms")
          .setLabel("Read Guild Terms")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("btn-guildform")
          .setLabel("Fill Form")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId("btn-guildmention")
          .setLabel("Mention Now")
          .setStyle(ButtonStyle.Secondary)
      )

    ThreadSend.send({
        content: `<@${interaction.user.id}> <@&1235965537326993450> <:al_wisdomlleud:1334882891200594012>`
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
