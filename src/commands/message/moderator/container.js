const { ContainerBuilder, TextDisplayBuilder, ActionRowBuilder, ButtonBuilder, MessageFlags, MediaGalleryBuilder, ButtonStyle, SectionBuilder, SeparatorBuilder, SeparatorSpacingSize, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");

module.exports = new Object({
    name: "a",
    description: "making container",
    category: "moderator",
    usage: `a`,
    cooldown: 0,
    aliases: [],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
        user: ['ManageMessages'],
        dev: false,
    },
    player: { voice: false, active: false, dj: false, },

    async execute(client, message, args) {
        if (!message.member.roles.cache.has(client.config.lunariaRole)) {
            return message.reply(`**No, you can't**,\n-# Only the **LUNARIA** able to command me for this`);
        }

        const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large })
        const container = new ContainerBuilder()
        const container2 = new ContainerBuilder()
        const container3 = new ContainerBuilder()

        // GUIDELINES

        const media = new MediaGalleryBuilder()
            .addItems([{
                type: "image",
                media: { url: `https://i.imgur.com/fxyTbJl.png` }
            }])
        const textDisplay = new TextDisplayBuilder().setContent('> **Questions, appeals, or concerns about the LUNA+ community?** Open a support ticket for *server-related support only* (roles, access, features, rules, or technical issues). Your message will be seen only by the Lunarias, and handled quietly beneath the moon.')
        const textFooter = new TextDisplayBuilder().setContent(`-# This includes appeals for the \`open commission\` tag submitted in <#1462415912916353241>`)
        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('btn-ticketopen')
                .setLabel('Create a Support Ticket')
                .setStyle(ButtonStyle.Primary),
        )
        const section = new SectionBuilder()
            .addTextDisplayComponents(textFooter)
            .setButtonAccessory(button => button
                .setCustomId('btn-ticketopen')
                .setStyle(ButtonStyle.Primary)
                .setLabel(`Open a Support Ticket`)
            )
        container.addTextDisplayComponents(textDisplay)
        // container.addActionRowComponents(button)
        // container.addTextDisplayComponents(textFooter)
        container.addSectionComponents(section)

        // SHOWCASE+

        const media2 = new MediaGalleryBuilder()
            .addItems([{
                type: "image",
                media: { url: `https://i.imgur.com/iPMaoDN.png` }
            }])
        const textHeader = new TextDisplayBuilder().setContent('-# A space to discover your identity within the constellation.\nHere, you can **generate your unique LUNA+ member card**')
        const section2 = new SectionBuilder()
            .addTextDisplayComponents(textHeader)
            .setButtonAccessory(button => button
                .setCustomId('btn-fellowcard')
                .setStyle(ButtonStyle.Secondary)
                .setLabel(`See 𝕱𝖊𝖑𝖑𝖔𝖜𝖈𝖆𝖗𝖉`)
                .setEmoji({
                    name: 'luna_cool_glasses',
                    id: '1461723408441151806'
                })
            )
        const textDisplay2 = new TextDisplayBuilder().setContent(`> -# Learn how to set the LUNA+ **server tag** on your profile across desktop and mobile, and unlock the special <@&1459924462744113243> role, automatically bestowed by <@839380589508558910> upon those who wear the tag. Choose a path below and let your presence shine among your fellowships <:ico_radiance:1334864373331787827>`)
        const button2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('btn-ost')
                .setLabel('LUNA+ OST')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji({
                    name: 'ic_audio',
                    id: '1463443740692713505'
                }),
            // new ButtonBuilder()
            //     .setCustomId('btn-fellowcard')
            //     .setLabel('See 𝕱𝖊𝖑𝖑𝖔𝖜𝖈𝖆𝖗𝖉')
            //     .setStyle(ButtonStyle.Secondary)
            //     .setEmoji({
            //         name: 'luna_cool_glasses',
            //         id: '1461723408441151806'
            //     }),
        )
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('menu-tagguild')
            .setPlaceholder('tutorial tag server on profile')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Desktop (PC)')
                    .setDescription('Learn how to add the tag on Desktop')
                    .setValue('tagguildpc')
                    .setEmoji({
                        name: 'ic_repost',
                        id: '1334863701026541648'
                    }),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Mobile')
                    .setDescription('Learn how to add the tag on Mobile')
                    .setValue('tagguildmobile')
                    .setEmoji({
                        name: 'ic_repost',
                        id: '1334863701026541648'
                    }),
            );
        const button3 = new ActionRowBuilder().addComponents(selectMenu);
        container2.addActionRowComponents(button2)
        container2.addTextDisplayComponents(textHeader)
        // container2.addSectionComponents(section2)
        container2.addSeparatorComponents(separator)
        container2.addTextDisplayComponents(textDisplay2)
        container2.addActionRowComponents(button3)

        return message.channel.send({ flags: MessageFlags.IsComponentsV2, components: [media, container, media2, container2], allowedMentions: { parse: [] } })
    }
});