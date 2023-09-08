module.exports = new Object({
    name: "acvcloseticket",
    description: "acvcloseticket.",
    category: "Ticket",
    usage: "",
    cooldown: 0,
    aliases: [],
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
        await message.delete().catch((e) => { });
        if (!message.channel.name.includes('ticket')) return message.reply('You are not allowed to delete a normal channel').catch((e) => { });
        message.channel.send({ content: "Closing ticket in 5 seconds <a:_util_loading:863317596551118858>" }).catch((e) => { });
        setTimeout(() => {
            message.channel.delete().catch((e) => { });
        }, 5000)
    }
});


