const { EmbedBuilder } = require("discord.js");

module.exports = new Object({
  name: "whisperers",
  description: "Mass DM all members with a specific role",
  category: "moderator",
  usage: `whisperers <@role>`,
  cooldown: 0,
  aliases: [],
  examples: ["whisperers @Announcements"],
  sub_commands: [],
  args: true,
  permissions: {
    client: [],
    user: ['ManageMessages'],
    dev: false,
  },
  player: { voice: false, active: false, dj: false, },

  async execute(client, message, args) {
    // 1. Parse Role
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

    if (!role) {
      return message.reply("Please mention a valid role or provide a valid Role ID.");
    }

    // 2. Fetch Members
    // Ensure all members are cached to get an accurate list
    await message.guild.members.fetch();
    const membersWithRole = role.members.filter(m => !m.user.bot); // Exclude bots

    if (membersWithRole.size === 0) {
      return message.reply(`No humans found with the role **${role.name}**.`);
    }

    // Calculate estimated time (avg 3.5s per member)
    const estimatedSeconds = membersWithRole.size * 3.5;
    const estimatedMinutes = (estimatedSeconds / 60).toFixed(1);

    const statusMsg = await message.reply({
      content: `Found **${membersWithRole.size}** members with role **${role.name}**.\n` +
               `Estimated time: **~${estimatedMinutes} minutes** (Safety delay active).\n` +
               `Starting mass DM...`
    });

    let successCount = 0;
    let failCount = 0;
    let closedDmCount = 0;

    // 3. Iterate and Send
    const members = Array.from(membersWithRole.values());
    
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      try {
        await member.send("test");
        successCount++;
      } catch (error) {
        if (error.code === 50007) { // Cannot send messages to this user (Closed DMs)
          closedDmCount++;
        } else {
          failCount++;
          console.error(`Failed to DM ${member.user.tag}:`, error);
        }
      }

      // Progress Update every 10 members
      if ((i + 1) % 10 === 0) {
        await statusMsg.edit(`Progress: **${i + 1}/${members.length}** members processed...`);
      }

      // Safety Delay: Random between 2500ms and 4500ms (Jitter)
      // This makes the bot behavior look less robotic and reduces rate limit risk
      if (i < members.length - 1) {
        const delay = Math.floor(Math.random() * 2000) + 2500; 
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // 4. Report Results
    const reportEmbed = new EmbedBuilder()
      .setTitle("Mass DM Report")
      .setDescription(`Target Role: ${role}\nTotal Members: **${membersWithRole.size}**`)
      .addFields(
        { name: "Success", value: `${successCount}`, inline: true },
        { name: "Closed DMs", value: `${closedDmCount}`, inline: true },
        { name: "Failed (Other)", value: `${failCount}`, inline: true }
      )
      .setColor(client.config.embedColor || 0x00FF00)
      .setTimestamp();

    await statusMsg.edit({ content: "Mass DM complete!", embeds: [reportEmbed] });
  }
});
