const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = new Object({
    name: "ascended",
    description: "ascended.",
    category: "Moderator",
    usage: "",
    cooldown: 0,
    aliases: [''],
    examples: [''],
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
        // Get the role option from the user's input
        const role = message.mentions.roles.first();

        // Get all members in the server
        const members = await message.guild.members.fetch();

        // Give the role to all members
        members.forEach(member => {
            if (!member.roles.cache.has(role.id)) {
                member.roles.add(role);
            }
        });

        // Send a success message
        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setDescription(`Successfully gave the "${role.name}" role to all members.`);

        return message.reply({ embeds: [embed] });
    }
});