
const { ButtonStyle, ContainerBuilder, SectionBuilder, TextDisplayBuilder, MessageFlags, MediaGalleryBuilder, SeparatorBuilder, SeparatorSpacingSize } = require("discord.js");
module.exports = new Object({
    name: "levatio",
    description: "giving mentioned member levatio role",
    category: "deadfrontier",
    usage: `levatio <@user>`,
    cooldown: 0,
    aliases: ['df'],
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
        if (!target) return message.reply('Please `mention` them, the one who is about to be a **Levatio** <:al_levatio:1376685304005525585>');

        let role = client.config.levatioRole;

        message.guild.channels.cache.get(client.config.deadfrontierChannel).send({
            content: `**An luna lux vanitas** <@${target.user.id}> <:al_levatio:1376685304005525585>\n-# May the lights guide you, so you may bask in its light as true **Levatio**`,
        }).then(target.roles.add(role)).catch((e) => { });

        await message.delete().catch((e) => { });

        const container = new ContainerBuilder()
        const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large })
        const textHeader = new TextDisplayBuilder().setContent(`# 𝕷𝖚𝖓𝖆 𝕷𝖊𝖛𝖆𝖙𝖎𝖔`)
        const section = new SectionBuilder()
            .addTextDisplayComponents(textHeader)
            .setButtonAccessory(button => button
                .setStyle(ButtonStyle.Link)
                .setURL(`https://discord.com/channels/1457941632052756634/1457979192892199012`)
                .setLabel(`Go to Clan Outpost`)
            )
        const textContent = new TextDisplayBuilder().setContent(`You have been gived **Levatio** role and have access to [\`#clan-vault\`](https://discord.com/channels/1457941632052756634/1461249504031412351) and [\`#clan-machine\`](https://discord.com/channels/1457941632052756634/1471666036037259385) as an official member in **Rune: Dead Frontier** category`)
        const dfpSignature = new MediaGalleryBuilder()
            .addItems([{
                type: "image",
                media: { url: `https://i.imgur.com/fbpKbwx.png` }
            }])
        const textFooter = new TextDisplayBuilder().setContent(`-# May the lights guide us, so we may bask in its light as true levatios`)

        container.addSectionComponents(section)
        container.addSeparatorComponents(separator)
        container.addTextDisplayComponents(textContent)
        container.addMediaGalleryComponents(dfpSignature)
        container.addTextDisplayComponents(textFooter)

        await target.user.send({
            flags: MessageFlags.IsComponentsV2,
            components: [container],
        }).catch((e) => { });
    }
})


