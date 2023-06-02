const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = new Object({
  name: "test2",
  description: "test2.",
  category: "Blackdesert",
  usage: "",
  cooldown: 0,
  aliases: ["test2"],
  examples: [""],
  sub_commands: [],
  args: false,
  permissions: {
    client: [],
    user: [],
    dev: false,
  },
  /**
   * @param {import("../../../index")} client
   * @param {import("discord.js").Message} message
   */
  execute: async (client, message) => {
    const bTon = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("btn-absence")
        .setLabel("Guild Guidelines")
        .setStyle(ButtonStyle.Secondary)
    );
    message
      .reply({ content: `this is a test2`, components: [bTon] })
      .catch(() => {});
  },
});
