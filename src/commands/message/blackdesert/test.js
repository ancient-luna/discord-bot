const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = new Object({
  name: "test",
  description: "test.",
  category: "Blackdesert",
  usage: "",
  cooldown: 0,
  aliases: ["test"],
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
        .setCustomId("btn-disciple")
        .setLabel("Guild Guidelines")
        .setStyle(ButtonStyle.Primary)
    );
    message
      .reply({ content: `this is a test`, components: [bTon] })
      .catch(() => {});
  },
});
