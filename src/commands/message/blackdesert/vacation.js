const { ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
module.exports = new Object({
    name: "vacation",
    description: "vacation.",
    category: "Blackdesert",
    usage: "",
    cooldown: 0,
    aliases: ['absence'],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
        user: [],
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

        const sanctumHall = '1060992670035619931'

        if (message.channel.id === sanctumHall) {

            const btnLetter = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId("btn-guildvacation")
                .setLabel("Apply for Vacation")
                .setStyle(ButtonStyle.Success)
            );

            message.channel.send({
                content: "Fill the form in **1 min** <a:_util_loading:863317596551118858>",
                components: [btnLetter]
            }).then((msg) => {
                setTimeout(() => msg.delete().catch((e) => { }), 60000);
                setTimeout(() => message.delete().catch((e) => { }));
            }).catch((err) => { throw err; })
        } else {
            return message.channel.send(`*You can't send a vacancy letter from here, go back to <#1060992670035619931> to send!*`).then((msg) => {
                setTimeout(() => msg.delete().catch((e) => { }), 10000);
                setTimeout(() => message.delete().catch((e) => { }));
            }).catch((err) => {
                throw err;
            });
        }

    }
})





