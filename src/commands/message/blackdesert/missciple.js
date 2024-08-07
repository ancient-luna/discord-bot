const { EmbedBuilder } = require("discord.js");
module.exports = new Object({
    name: "missciple",
    description: "missciple.",
    category: "Blackdesert",
    usage: "",
    cooldown: 0,
    aliases: [''],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
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

        if (!target) return message.reply('Please `mention` them, the one who is about to lose theirs');

        let role = '1060982357538119850';

        // const decide = "\n\n> We always welcome you back to the guild when decide to be active again";

        const addLD = new EmbedBuilder()
            .setAuthor({ name: "ROLE REMOVED", iconURL: "https://i.imgur.com/hSlBkoj.png" })
            .setDescription("Your **Lunar Disciples** role has been removed and no longer have access to guild only channels in **[Ecplise Boarder Hall](https://discord.com/channels/447069790150852609/1060992670035619931)** category. If have any questions regarding this dont hesitate to reach and mention the Ancestor and the Elders in **[#city](https://discord.com/channels/447069790150852609/1049228301807407156)**\n\n-# You have been kicked due inactivity without vacation. We will welcome you back if decide to play actively again and to rejoin the guild ♡ **missing you**")
            .setTimestamp()
            .setColor(client.config.embedColorTrans)
            .setFooter({ text: "Ancient Luna Guild: We ran as if to meet the moon" })

        await target.user.send({ embeds: [addLD] }).then(target.roles.remove(role)).catch((e) => { });

        await message.react("✅").then(setTimeout(() => message.delete().catch((e) => { }), 5000)).catch((err) => { throw err; })
    }
})

