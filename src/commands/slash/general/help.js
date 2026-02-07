const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ContainerBuilder, MediaGalleryBuilder, MessageFlags, TextDisplayBuilder, SeparatorSpacingSize, SeparatorBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Whole Luna information that you might need to know"),

  cooldown: 3,

  async execute(client, interaction) {
    const serverButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("btn-helpcmd")
        .setLabel("Commands")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel("Server")
        .setStyle(ButtonStyle.Link)
        .setURL("https://discord.com/invite/MktSB4Kxgz"),
      new ButtonBuilder()
        .setLabel("Support")
        .setStyle(ButtonStyle.Link)
        .setURL("https://ko-fi.com/imdae"),
      new ButtonBuilder()
        .setLabel("YouTube")
        .setStyle(ButtonStyle.Link)
        .setURL("https://www.youtube.com/@ancientluna")
    );

    const prefixTag = '<:prefix_1:1464225293467390137><:prefix_2:1464225296059334708><:prefix_3:1464225297879793698>';

    const container = new ContainerBuilder()
    const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large });
    // const headerImage = new MediaGalleryBuilder().addItems({ type: 'image', media: { url: 'https://i.imgur.com/c8QnpbX.gif' } });
    const textHeader = new TextDisplayBuilder().setContent(`# 우리는 마치 달을 만난 것처럼 달렸다`)
    const textDetail = new TextDisplayBuilder().setContent(`I'm a relic, born from [@imsoondae](https://www.instagram.com/?/)'s will in pursuit of wisdom\nSustained by [the elders](https://github.com/orgs/3-14-denies-Pi)'s blessings through the ages`)
    const textPrefix = new TextDisplayBuilder().setContent(`-# current command ${prefixTag} is: \`!\``);

    container.addTextDisplayComponents(textHeader);
    // container.addMediaGalleryComponents(headerImage);
    container.addTextDisplayComponents(textDetail);
    container.addTextDisplayComponents(textPrefix);
    container.addSeparatorComponents(separator);
    container.addActionRowComponents(serverButton);

    await interaction.reply({
      flags: MessageFlags.IsComponentsV2,
      components: [container],
      allowedMentions: { parse: [] },
    });
  },
};