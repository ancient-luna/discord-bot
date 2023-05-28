const { reactionHandler } = require('../handlers');
/**
     * @param {import("discord.js").GuildMember} member
     * @param {import("discord.js").MessageReaction} reaction
     */
module.exports = new Object({
    name: "messageReactionAdd",
    /**
     * @param {import("../../Eunha")} client 
     * @param {import("discord.js").Message} message
     * @param {import("discord.js").GuildMember} member
     * @param {import("discord.js").MessageReaction} reaction
     */
    async execute(member, reaction) {
        if (!member || !member.guild) return;
        reactionHandler.handleReaction(reaction, member);
    }
})






