
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, MediaGalleryBuilder, MessageFlags } = require("discord.js");
module.exports = new Object({
    name: "dfp",
    description: "do give player dfp role",
    category: "deadfrontier",
    usage: `dfp`,
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
            return message.reply(`**No, you can't**. only the **LUNARIA** able to command me for this.`);
        }
        const container = new ContainerBuilder()
        const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large })
        const banner = new MediaGalleryBuilder()
            .addItems([{
                type: 'image',
                media: {
                    url: 'https://i.imgur.com/8TdP6Kl.gif'
                }
            }])
        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('btn-dfbehemoth')
                .setLabel('Behemoth')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('btn-dfdevil')
                .setLabel('DH')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('btn-dfvolatile')
                .setLabel('VL')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('btn-dfoutpost')
                .setLabel('OAttack')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('btn-dfbandit')
                .setLabel('Bandit')
                .setStyle(ButtonStyle.Danger)
        )
        container.addMediaGalleryComponents(banner)
        container.addSeparatorComponents(separator)
        container.addActionRowComponents(button)
        return message.channel.send({
            flags: MessageFlags.IsComponentsV2,
            components: [container]
        })
    }
})