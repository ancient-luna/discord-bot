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
    .setDescription("Welcome to the sanctuary of lights\nA home for the light seekers!")
    .addFields(
        { name: `**Street Fight / PVP**`, value: `<:_1:1075437107704778943> Killing is OK __**only** in arsha__\n<:_2:1075437110183604355> Avoid bad manner and dont ever trash talking in any servers\n<:_3:1075437114721837157> For spots \`normal server\` can kill **but** ask for DFS first \`arsha server\` free kill`, inline: false },
        { name: `**Guild Quests**`, value: `<:_1:1075437107704778943> Guild Quests only can be taken for (Large) size only\n<:_2:1075437110183604355> SMH and Combat GQs can be taken around time 00.00 - 00.00 GMT+8\n<:_3:1075437114721837157> Life GQs can be taken around time 19.00 - 00.00 GMT+8`, inline: false },
        { name: `**Vacation / Day-Off**`, value: `If you are unable to login for 7 days straight it is a must to let us know so we may not kick you out from the guild.\n> Apply for vacation in <#1123093540940029972>`, inline: false }
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
