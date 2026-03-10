const { ContainerBuilder, TextDisplayBuilder, MessageFlags } = require("discord.js");
module.exports = new Object({
    name: "unacolyte",
    description: "removing mentioned member lunar acolyte role",
    category: "blackdesert",
    usage: `unacolyte <@user>`,
    cooldown: 0,
    aliases: [],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: { client: [], user: [], dev: false, },
    player: { voice: false, active: false, dj: false, },

    async execute(client, message, args) {
        const lunariaID = client.config.lunariaRole;
        if (!message.member.roles.cache.has(lunariaID)) {
            return message.reply(`**No, you can't**\n-# Only the **LUNARIA** able to command me for this.`);
        }

        let target = message.mentions.members.first();
        if (!target) return message.reply('Please `mention` them, the one who is about to lose theirs');

        let role = client.config.acolyteRole;

        const container = new ContainerBuilder()
        const textHeader = new TextDisplayBuilder().setContent(`## <:al_mark_stamp:1470657558573219968> That's it, ex-acolyte`)
        const textContent = new TextDisplayBuilder().setContent(`-# Your **Lunar Acolyte** role has been removed and no longer have access to guild only channels in **Rune: Black Desert Online** category. If have any questions regarding this don't hesitate to reach and mention the Lunarians in [\`#sanctum\`](https://discord.com/channels/1457941632052756634/1459896787371425884)`)

        container.addTextDisplayComponents(textHeader)
        container.addTextDisplayComponents(textContent)

        await target.user.send({ flags: MessageFlags.IsComponentsV2, components: [container] }).then(target.roles.remove(role)).catch((e) => { });

        await message.react("✅").then(setTimeout(() => message.delete().catch((e) => { }), 5000)).catch((err) => { throw err; });
    }
})

