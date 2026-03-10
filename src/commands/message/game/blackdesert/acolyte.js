const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ContainerBuilder, TextDisplayBuilder, SeparatorBuilder, SeparatorSpacingSize, MessageFlags, SectionBuilder, MediaGalleryBuilder } = require("discord.js");
module.exports = new Object({
    name: "acolyte",
    description: "giving mentioned member lunar acolyte role",
    category: "blackdesert",
    usage: `acolyte <@user>`,
    cooldown: 0,
    aliases: ['bdo'],
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
        if (!target) return message.reply('Please `mention` them, the one who is about to be the **Lunar Acolyte**');

        let role = client.config.acolyteRole;

        const btnTerms = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("btn-guildterms")
                    .setLabel("Rules")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("btn-guildbanner")
                    .setLabel("Banner")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setLabel("Join Alliance")
                    .setURL("https://discord.gg/tjdhmd38P5")
                    .setStyle(ButtonStyle.Link),
            )

        message.guild.channels.cache.get(client.config.blackdesertChannel).send({
            content: `**We ran as if to meet the moon** <:al_mark_stamp:1470657558573219968>,\n-# A seeker named <@${target.user.id}> become a part of **Lunar Acolyte**`,
            components: [btnTerms]
        }).then(target.roles.add(role));

        await message.delete().catch((e) => { });

        const container = new ContainerBuilder()
        const textHeader = new TextDisplayBuilder().setContent('# 𝕬𝖓𝖈𝖎𝖊𝖓𝖙 𝕷𝖚𝖓𝖆')
        const section = new SectionBuilder()
            .addTextDisplayComponents(textHeader)
            .setButtonAccessory(button => button
                .setStyle(ButtonStyle.Link)
                .setURL(`https://discord.com/channels/1457941632052756634/1459896787371425884`)
                .setLabel(`Visit Guild Sanctum`)
            )
        const separator = new SeparatorBuilder({ spasing: SeparatorSpacingSize.Large })
        const textContent = new TextDisplayBuilder().setContent(`You have been gived **Lunar Acolyte** role and have access to all channels as an official guild member in **Rune: Black Desert Online** category`)
        const bdoSignature = new MediaGalleryBuilder()
            .addItems([{
                type: "image",
                media: { url: `https://i.imgur.com/KGWUhaS.png` }
            }])
        const textFooter = new TextDisplayBuilder().setContent(`-# May the lights guide us, so we may bask in its light as true lunar acolytes`)

        container.addSectionComponents(section)
        container.addSeparatorComponents(separator)
        container.addTextDisplayComponents(textContent)
        container.addMediaGalleryComponents(bdoSignature)
        container.addTextDisplayComponents(textFooter)

        await target.user.send({
            flags: MessageFlags.IsComponentsV2,
            components: [container]
        }).catch((e) => { });
    }
})