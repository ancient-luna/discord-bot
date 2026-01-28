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
        // const text = message.content.split(' ').slice(1).join(' ');
        // if (!text) return message.reply("You.. **you** need to write something for me,\n-# not even Ancestor can save you from this");

        const container = new ContainerBuilder()
        const media = new MediaGalleryBuilder()
            .addItems([{
                type: "image",
                media: { url: `https://i.imgur.com/fxyTbJl.png` }
            }])
        const textDisplay = new TextDisplayBuilder().setContent('Questions or concerns about the LUNA+ community? Use Open Ticket for **server-related support only** (roles, access, features, rules, or technical issues). Your message will be seen only by the Lunarias, and handled quietly beneath the moon.')
        const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large })
        const textFooter = new TextDisplayBuilder().setContent(`-# Includes the \`open commission\` tag appeal for <#1462415912916353241>`)
        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('btn-ticketopen')
                .setLabel('Create a Support Ticket')
                .setStyle(ButtonStyle.Primary),
        )

        const medias = new MediaGalleryBuilder()
            .addItems([{
                type: "image",
                media: { url: `https://i.imgur.com/iPMaoDN.png` }
            }])
        const textHeader = new TextDisplayBuilder().setContent('-# A space to discover your identity within the constellation.')
        const section = new SectionBuilder()
            .addTextDisplayComponents(textHeader)
            .setButtonAccessory(button => button
                .setCustomId('btn-fellowcard')
                .setStyle(ButtonStyle.Secondary)
                .setLabel(`See Your Fellow Card`)
                .setEmoji({
                    name: 'luna_cool_glasses',
                    id: '1461723408441151806'
                })
            )
        const textDisplays = new TextDisplayBuilder().setContent(`Here, you can **generate your unique LUNA+ member card**, learn how to set the LUNA+ **server tag** on your profile across desktop and mobile, and unlock the special <@&1459924462744113243> role, automatically bestowed by <@839380589508558910> upon those who wear the tag. Choose a path below and let your presence shine among your fellow cards <:ico_radiance:1334864373331787827>`)
        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('btn-ost')
                .setLabel('LUNA+ OST')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji({
                    name: 'ic_audio',
                    id: '1463443740692713505'
                }),
        )

        container.addTextDisplayComponents(textDisplay)
        // container.addSeparatorComponents(separator)
        container.addTextDisplayComponents(textFooter)
        container.addActionRowComponents(button)

        // container.addSectionComponents(section)
        // container.addSeparatorComponents(separator)
        // container.addTextDisplayComponents(textDisplays)
        // container.addActionRowComponents(buttons)

        // const components = [container]
        // const attachment = message.attachments.first()
        // if (attachment) {
        //     const mediaGallery = new MediaGalleryBuilder().addItems([{ type: 'image', media: { url: attachment.url } }])
        //     components.unshift(mediaGallery)
        // }

        return message.channel.send({ flags: MessageFlags.IsComponentsV2, components: [media, container], allowedMentions: { parse: [] } })
    }
});