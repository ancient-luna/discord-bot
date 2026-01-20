const { ContainerBuilder, TextDisplayBuilder, ActionRowBuilder, ButtonBuilder, MessageFlags, MediaGalleryBuilder, ButtonStyle, SectionBuilder, SeparatorBuilder, SeparatorSpacingSize } = require("discord.js");

module.exports = new Object({
    name: "container",
    description: "making container",
    category: "moderator",
    usage: `container`,
    cooldown: 0,
    aliases: [],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: {
        client: ['ManageGuild'],
        user: ['ManageMessages'],
        dev: false,
    },
    player: { voice: false, active: false, dj: false, },

    async execute(client, message, args) {
        const text = message.content.split(' ').slice(1).join(' ');
        if (!text) return message.reply("You.. **you** need to write something for me,\n-# not even Ancestor can save you from this");

        const container = new ContainerBuilder()
        const textDisplay = new TextDisplayBuilder().setContent(text)
        const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large })
        const textFooter = new TextDisplayBuilder().setContent(`-# *The Commission Request option is currently unavailable, as the commission appeal system is still being prepared and will open soon.`)
        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('btn-ticketopen')
                .setLabel('Open Ticket')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('btn-opencommission')
                .setLabel('Commission Permission Request')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true),
        )

        const textHeader = new TextDisplayBuilder().setContent('-# A space to discover your identity within the constellation.')
        const section = new SectionBuilder()
            .addTextDisplayComponents(textHeader)
            .setButtonAccessory(button => button
                .setCustomId('btn-fellowcard')
                .setStyle(ButtonStyle.Secondary)
                .setLabel(`See Your Fellow Card`)
                .setEmoji({
                    name: 'sc_verified',
                    id: '1334889120849330266'
                })
            )
        const textDisplays = new TextDisplayBuilder().setContent(text)
        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('btn-tagguildpc')
                .setLabel('Tag Tutorial (Desktop)')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('btn-tagguildmobile')
                .setLabel('Tag Tutorial (Mobile)')
                .setStyle(ButtonStyle.Secondary)
        )

        // container.addTextDisplayComponents(textDisplay)
        // container.addSeparatorComponents(separator)
        // container.addTextDisplayComponents(textFooter)
        // container.addActionRowComponents(button)

        container.addSectionComponents(section)
        container.addSeparatorComponents(separator)
        container.addTextDisplayComponents(textDisplays)
        container.addActionRowComponents(buttons)

        const components = [container]
        const attachment = message.attachments.first()
        if (attachment) {
            const mediaGallery = new MediaGalleryBuilder().addItems([{ type: 'image', media: { url: attachment.url } }])
            components.unshift(mediaGallery)
        }

        return message.channel.send({ flags: MessageFlags.IsComponentsV2, components: components, allowedMentions: { parse: [] } })
    }
});