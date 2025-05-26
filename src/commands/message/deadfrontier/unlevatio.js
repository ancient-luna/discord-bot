const { EmbedBuilder } = require("discord.js");
module.exports = new Object({
    name: "unlevatio",
    description: "removing mentioned member levatio role",
    category: "deadfrontier",
    usage: `${client.prefix}unlevatio <@user>`,
    cooldown: 0,
    aliases: [],
    examples: [],
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
        const lunariaID = '839170815932891197';
        if (!message.member.roles.cache.has(lunariaID)) {
            return message.reply(`**No, you can't**, only the **LUNARIA** able to command me for this.`);
        }

        let target = message.mentions.members.first();
        if (!target) return message.reply('Please mention them, the one who is about to lose theirs').catch(e => { });

        let role = '1052973235710464040';

        const addLD = new EmbedBuilder()
            .setAuthor({ name: "ROLE REMOVED", iconURL: "https://i.imgur.com/aLkmV4I.png" })
            .setDescription("Your **Levatio** role has been removed and no longer have access to clan only channels in **[Survivors Homeland](https://discord.com/channels/447069790150852609/860531645916774401)** category. If have any questions regarding this dont hesitate to reach and mention the Levatios in **[#meeting-hall](https://discord.com/channels/447069790150852609/860531645916774401)**")
            .setTimestamp()
            .setColor(client.config.embedColorTrans)
            .setFooter({ text: "Ancient Luna Guild: We ran as if to meet the moon" })

        await target.user.send({ embeds: [addLD] }).then(target.roles.remove(role)).catch((e) => { });

        await message.react("✅").then(setTimeout(() => message.delete().catch((e) => { }), 5000)).catch((err) => {
            throw err;
        })
    }
})

