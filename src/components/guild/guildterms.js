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
    .setTitle(`우리는 마치 달을 만난 것처럼 달렸다`)
    .setDescription("-# A home for the light seekers!")
    .addFields(
        { name: `**Street Fight / PVP**`, value: `- Killing is OK **only** in *Arsha server*\n- For spots in *normal server* can kill **but** ask for DFS first; *Arsha server* free kill\n- Be respectful and avoid trash talk on any of the servers\n - -# Any toxic behavior, both inside and outside the guild, is strongly prohibited. Action will be taken if it happens`, inline: false },
        { name: `**Guild Quests**`, value: `- All members have permissions to take Guild Quests by their own. Feel free, either its SMH, Combat, and Life GQs. No limits.`, inline: false },
        { name: `**Guild Buffs**`, value: `- It's always ready 24/7\n - -# Just ask in-game guild chat to cast the guild buffs (Combat and/or Life)\n - -# Mention <@&1235965537326993450> in <#1060992670035619931> to cast the guild buffs (Combat and/or Life) if any of the officers are currently not online in game`, inline: false },
        { name: `**Vacation / Day-Off**`, value: `If you are unable to login for 7 days straight, it is a must to let us know so we may not kick you out from the guild. **Vacation** button in <#1060992992523079800>`, inline: false }
    )
    .setColor(client.config.embedColorTrans)
    .setTimestamp()
    .setFooter({ text: "Ancient Luna Guild: We ran as if to meet the moon" })

    const btnGuild = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel(`Guild Forum`)
          .setURL(`https://www.sea.playblackdesert.com/en-US/Forum/ForumTopic/Detail?_topicNo=42709&_page=1&_opinionNo=69067`),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel(`Guild Video`)
          .setURL(`https://youtu.be/3S8HVfHYJ5k`),
      )
        
    return interaction.reply({
      embeds: [addLDrule],
      components: [btnGuild],
      ephemeral: true,
    });
  },
};
