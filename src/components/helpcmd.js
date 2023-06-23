const { EmbedBuilder } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "helpcmd",
  id: "btn-helpcmd",
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
    const cmdText = "## Generals and Entertainments\n- `!advice` giving random advice to mentioned member\n- `!anime` searching anime based on MyAnimeList\n- `!dictionary` giving example sentences based on Urban Dictionary\n- `!quote` sending quotes\n- `!reminder` setting up a reminder in min/hrs\n- `!spotify` tracking member's listened current song on spotify\n- `!watchtogether` giving link for YouTube Watch Together on current joined voice channel\n## Game Status Trackers\n- **DEAD FRONTIER 1**\n - `!record` tracking weekly CTS/CTL\n - `!status` tracking player stats including weapons, location, and many\n## Miscellaneous\n- `!emotionaldamage` kelly is attacking!\n-n `!grrr` why you steal my points?!\n- `!rawr` you wanna fite?\n- `!spit` pui! lavena spitting too much"      
    return interaction.reply({
        content: cmdText,
        ephemeral: true,
    });
  },
};
