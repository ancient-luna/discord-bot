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

    const cmdText = "## Generals and Entertainments\n- `advice` giving random advice to mentioned member\n- `!anime` searching anime based on MyAnimeList\n- `!dictionary` giving example sentences based on Urban Dictionary\n- `!quote` sending quotes\n- `!reminder` setting up a reminder in min/hrs\n- `!spotify` tracking member's listened current song on spotify\n- `!watchtogether` giving link for YouTube Watch Together on current joined voice channel\n## Game Status Trackers\n- **DEAD FRONTIER 1**\n - `!record` tracking weekly CTS/CTL\n - `!status` tracking player stats including weapons, location, and many\n## Miscellaneous\n- `!dreamon` yah it was fun getting boosted\n- `!emotionaldamage` kelly is attacking!\n- `!rawr` you wanna fite?\n- `!spit` pui! lavena spitting too much"
    
    const addLDrule = new EmbedBuilder()
    .setAuthor({ name: "Ancient Luna Guild Terms", iconURL: "https://i.imgur.com/SOCuup9.png" })
    .setDescription("Welcome to the sanctuary of lights\nA home for the light seekers!")
    .addFields(
        { name: `**Street Fight / PVP**`, value: `<:_1:1075437107704778943> Killing is OK __**only** in arsha__ ||😦 wanted free kill but- but..||\n<:_2:1075437110183604355> Avoid bad manner and dont ever trash talking in any servers\n<:_3:1075437114721837157> For spots \`normal server\` can kill **but** ask for DFS first \`arsha server\` free kill`, inline: false },
        { name: `**Guild Quests**`, value: `<:_1:1075437107704778943> Guild Quests only can be taken for (Large) size only\n<:_2:1075437110183604355> SMH and Combat GQs can be taken around time 00.00 - 00.00 GMT+8\n<:_3:1075437114721837157> Life GQs can be taken around time 19.00 - 00.00 GMT+8`, inline: false },
        { name: `**Vacation / Day-Off**`, value: `If you are unable to login for 7 days straight it is  a must to let know so we may not kick you out from the guild.\n\n> Do \`!vacation\` in <#1060992670035619931>`, inline: false }
    )
    .setColor("2b2d31")
    .setTimestamp()
    .setFooter({ text: "Ancient Luna Guild: We ran as if to meet the moon" })
        
    return interaction.reply({
        content: cmdText,
        // embeds: [addLDrule],
        ephemeral: true,
    });
  },
};
