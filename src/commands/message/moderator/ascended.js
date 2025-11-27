const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = new Object({
    name: "ascended",
    description: "giving mentioned member roles",
    category: "moderator",
    usage: `ascended <@role>`,
    cooldown: 0,
    aliases: [],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: {
        client: ['ManageGuild'],
        user: ['ManageRoles'],
        dev: false,
    },
    player: { voice: false, active: false, dj: false, },
    
    async execute(client, message, args) {
        const role = message.mentions.roles.first();
        if (!role) return message.reply("Please mention a valid role!");
        
        const members = await message.guild.members.fetch();

        let successCount = 0;
        let failCount = 0;

        for (const member of members.values()) {
            try {
                if (!member.roles.cache.has(role.id)) {
                    await member.roles.add(role);
                    successCount++;
                    await new Promise(res => setTimeout(res, 100));
                }
            } catch {
                failCount++;
            }
        }

        const embed = new EmbedBuilder()
            .setColor(client.config.embedColorBlurple)
            .setDescription(`<:srv_accept:1334881070449164378> Successfully gave the **${role.name}** role to ${successCount} members.\n<:srv_deny:1334881089205829674> Failed to add role to ${failCount} members.`);

        return message.reply({ embeds: [embed] });
    }
});