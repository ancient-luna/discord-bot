module.exports = new Object({
    name: "ungiven",
    description: "removing mentioned member roles",
    category: "moderator",
    usage: "",
    cooldown: 0,
    aliases: ['removerole'],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: ['ManageGuild'],
        user: ['ManageMessages'],
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
        let target = message.mentions.members.first();
        if (!target) return message.reply('Please `mention a member`');
        let role = message.mentions.roles.first();
        if (!role) return message.reply('`Add the role` to remove')
        await message.react("✅").then(target.roles.remove(role));
    }
});