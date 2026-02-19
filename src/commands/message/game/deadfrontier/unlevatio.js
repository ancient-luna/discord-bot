const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, ContainerBuilder, TextDisplayBuilder, MediaGalleryBuilder } = require("discord.js");
module.exports = new Object({
    name: "unlevatio",
    description: "removing mentioned member levatio role",
    category: "deadfrontier",
    usage: `unlevatio <@user>`,
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
            return message.reply(`**No, you can't**\n-# Only the **LUNARIA** able to command me for this`);
        }

        let target = message.mentions.members.first();
        if (!target) return message.reply('Please mention them, the one who is about to lose theirs').catch(e => { });

        let role = client.config.levatioRole;

        const container = new ContainerBuilder()
        const textHeader = new TextDisplayBuilder().setContent(`### <:al_levatio_rust:1474097326778744897> 𝕷𝖊𝖛𝖆𝖙𝖎𝖔 𝕽𝖔𝖑𝖊 𝕽𝖊𝖒𝖔𝖛𝖊𝖉`)
        const textContent = new TextDisplayBuilder().setContent(`-# Your **Levatio** role has been removed and no longer have access to clan only channels in **Rune: Dead Frontier** category. If have any questions regarding this dont hesitate to reach and mention the Levatios in [\`#outpost\`](https://discord.com/channels/1457941632052756634/1457979192892199012)`)

        container.addTextDisplayComponents(textHeader)
        container.addTextDisplayComponents(textContent)

        await target.user.send({ flags: MessageFlags.IsComponentsV2, components: [container] }).then(target.roles.remove(role)).catch((e) => { });

        await message.react("✅").then(setTimeout(() => message.delete().catch((e) => { }), 5000)).catch((err) => {
            throw err;
        })
    }
})

