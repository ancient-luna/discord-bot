const { EmbedBuilder } = require("discord.js");
module.exports = new Object({
    name: "undisciple",
    description: "removing mentioned member lunar disciple role",
    category: "blackdesert",
    usage: `undisciple <@user> [vac]`,
    cooldown: 0,
    aliases: [],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: { client: [], user: [], dev: false, },
    player: { voice: false, active: false, dj: false, },
    
    async execute(client, message, args) {
        const guildEldersID = '1235965537326993450';
        if (!message.member.roles.cache.has(guildEldersID)) {
            return message.reply(`**No, you can't**. only the **Guild Elders** able to command me for this.`);
        }

        let target = message.mentions.members.first();
        if (!target) return message.reply('Please `mention` them, the one who is about to lose theirs');

        let role = '1060982357538119850';

        let isVacation = args[0] && args[0].toLowerCase() === "vac";

        const letter = "Your **Lunar Disciples** role has been removed and no longer have access to guild only channels in **[Ecplise Boarder Hall](https://discord.com/channels/447069790150852609/1060992670035619931)** category. If have any questions regarding this don't hesitate to reach and mention the Ancestor and the Elders in **[#city](https://discord.com/channels/447069790150852609/1049228301807407156)**";

        const addLD = new EmbedBuilder()
            .setAuthor({ name: "ROLE REMOVED", iconURL: "https://i.imgur.com/hSlBkoj.png" })
            .setDescription( isVacation ? `${letter}\n\n-# You have been kicked due to inactivity without vacation. We will welcome you back if you decide to play actively again and to rejoin the guild ♡ **missing you**` : letter )
            .setTimestamp()
            .setColor(client.config.embedColorTrans)
            .setFooter({ text: "Ancient Luna Guild: We ran as if to meet the moon" });

        await target.user.send({ embeds: [addLD] }).then(target.roles.remove(role)).catch((e) => { });

        await message.react("✅").then(setTimeout(() => message.delete().catch((e) => { }), 5000)).catch((err) => { throw err; });
    }
})

