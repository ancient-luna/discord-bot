const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Whole Luna information that you might need to know"),

  cooldown: 1, // in seconds

  async execute(client, interaction) {
    const cB = "```";

    const descGeneral = new EmbedBuilder()
      .setTitle("About Ancient Luna Bot")
      .setDescription(`우리는 마치 달을 만난 것처럼 달렸다\nI'm a relic that was born by [@imsoondae](https://www.instagram.com/?/) to seek wisdom.\nBlessed by [@biglebomb](https://discordapp.com/users/306545868054593537) to be alive until now.`)
      .addFields(
        { name: "Prefix", value: `${cB}!${cB}`, inline: true },
        { name: "Help (Prefix)", value: `${cB}!help${cB}`, inline: true },
        { name: "Help (Command)", value: `${cB}/help${cB}`, inline: true }
      )
      .setColor(client.config.embedColorTrans)
      .setThumbnail("https://i.imgur.com/c8QnpbX.gif");

    const serverButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("btn-helpcmd")
        .setLabel("Commands")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setLabel("Server")
        .setStyle(ButtonStyle.Link)
        .setURL("https://discord.com/invite/Sbp2nt8QHe"),
      new ButtonBuilder()
        .setLabel("Support")
        .setStyle(ButtonStyle.Link)
        .setURL("https://ko-fi.com/daexx"),
      new ButtonBuilder()
        .setLabel("YouTube")
        .setStyle(ButtonStyle.Link)
        .setURL("https://www.youtube.com/@ancientluna")
    );

    await interaction.reply({
      embeds: [descGeneral],
      components: [serverButton],
    });
  },
};