const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = new Object({
    name: "sighting",
    description: "checking on members that has 0 roles",
    category: "moderator",
    usage: `sighting`,
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
    /**
     * 
     * @param {import("../../../index")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {
        const guild = message.guild;
        const serverId = guild.id;
        if (serverId !== client.config.ancientLunaServer) return message.reply(`I think.. you've just lost, didn't you?\n-# this command belongs to the sanctuary`)
        const insighted = guild.members.cache.filter(member => !member.user.bot && member.roles.cache.filter(role => role.id !== serverId).size === 0);
        if (insighted.size > 0) {
            const mentionList = insighted.map(m => `<@${m.id}>`).join(", ");
            return message.reply({
                content: `Found **${insighted.size}** members with no roles:\n${mentionList.length > 1500 ? 'Too many to list.' : mentionList}`,
                allowedMentions: { parse: [] }
            });
        } else {
            return message.reply(`<:srv_accepted:1334885365676507188> Every seekers has at least one role.`);
        }
    }
});