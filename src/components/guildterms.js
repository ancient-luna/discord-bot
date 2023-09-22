const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "guildterms",
  id: "btn-guildterms",
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
    
    const addLDrule = new EmbedBuilder()
    .setAuthor({ name: "Ancient Luna Guild Terms", iconURL: "https://i.imgur.com/SOCuup9.png" })
    .setDescription("A home for the light seekers!\n우리는 마치 달을 만난 것처럼 달렸다")
    .addFields(
        { name: `**Street Fight / PVP**`, value: `- Killing is OK __**only** in arsha__\n- For spots *normal server* can kill **but** ask for DFS first; *arsha server* free kill\n- Avoid bad manner and dont ever trash talking in any servers\n - Any toxicity behaviors in the guild and outside guild are strongly prohibited.  Action will be taken if it happens`, inline: false },
        { name: `**Guild Quests**`, value: `- Guild Quests only can be taken for **current guild size** only\n - SMH, Combat, and Life GQs can be in any time`, inline: false },
        { name: `**Vacation / Day-Off**`, value: `If you are unable to login for 7 days straight it is a must to let us know so we may not kick you out from the guild. **Apply for vacation** in <#1060992992523079800>`, inline: false }
    )
    .setColor("2b2d31")
    .setTimestamp()
    .setFooter({ text: "Ancient Luna Guild: We ran as if to meet the moon" })

    const btnGuild = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel(`Guild Forum`)
                .setURL(`https://www.sea.playblackdesert.com/en-US/Forum/ForumTopic/Detail?_topicNo=42709&_page=1&_opinionNo=69067`)
        )
        .addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel(`Guild Video`)
                .setURL(`https://youtu.be/3S8HVfHYJ5k`)
        )
        
    return interaction.reply({
      embeds: [addLDrule],
      components: [btnGuild],
      ephemeral: true,
    });
  },
};
