const { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, ContainerBuilder, TextDisplayBuilder, MediaGalleryBuilder, EmbedBuilder, SectionBuilder, SeparatorBuilder, SeparatorSpacingSize } = require("discord.js");

module.exports = {
    name: "clanaccept",
    id: "btn-clanaccept",
    permissions: {
        client: [],
        user: [],
        dev: false,
    },

    execute: async (client, interaction) => {
        const lunariaRole = client.config.lunariaRole;
        if (!interaction.member.roles.cache.has(lunariaRole)) {
            return await interaction.reply({
                content: `**No, you can't**\n-# Only the ** LUNARIA ** able to command me for this`,
                flags: MessageFlags.Ephemeral,
            });
        }

        const role = interaction.guild.roles.cache.get(client.config.levatioRole);
        if (!role) return;

        // Defer the update immediately to prevent interaction token from expiring
        await interaction.deferUpdate();

        const containerData = interaction.message.components[0];
        const containerComponents = containerData.components;

        const headerContent = containerComponents[0]?.data?.content || containerComponents[0]?.content || '';
        const userIdMatch = headerContent.match(/<@(\d+)>/);

        if (!userIdMatch) {
            return await interaction.followUp({
                content: 'Could not find the applicant from this form.',
                flags: MessageFlags.Ephemeral,
            });
        }

        const applicantId = userIdMatch[1];

        try {
            const member = await interaction.guild.members.fetch(applicantId);
            await member.roles.add(role);

            const dmContainer = new ContainerBuilder()
            const dmSeparator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large })
            const textHeader = new TextDisplayBuilder().setContent(`### <:al_levatio_rust:1474097326778744897> 𝕷𝖊𝖛𝖆𝖙𝖎𝖔 𝕽𝖔𝖑𝖊 𝕬𝖉𝖉𝖊𝖉`)
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

            dmContainer.addSectionComponents(section)
            dmContainer.addSeparatorComponents(dmSeparator)
            dmContainer.addTextDisplayComponents(textContent)
            dmContainer.addMediaGalleryComponents(dfpSignature)
            dmContainer.addTextDisplayComponents(textFooter)

            await member.user.send({
                flags: MessageFlags.IsComponentsV2,
                components: [dmContainer],
            }).catch((e) => { });
        } catch (err) {
            return await interaction.followUp({
                content: `Could not assign the role to <@${applicantId}>. They may have left the server.`,
                flags: MessageFlags.Ephemeral,
            });
        }

        const container = new ContainerBuilder();

        const statusText = new TextDisplayBuilder().setContent(`-# <:srv_accept:1334881070449164378> <@${applicantId}> got \`accepted\` by **${interaction.user.displayName}** <:ico_radiance:1334864373331787827>`);
        container.addTextDisplayComponents(statusText);

        if (containerComponents[1]?.data?.items || containerComponents[1]?.items) {
            const items = containerComponents[1].data?.items || containerComponents[1].items;
            const mediaGallery = new MediaGalleryBuilder().addItems(items.map(item => ({
                media: { url: item.media?.url || item.media?.proxy_url }
            })));
            container.addMediaGalleryComponents(mediaGallery);
        }

        const originalButtons = containerComponents[4]?.components || [];
        const newButtons = new ActionRowBuilder();

        for (const btn of originalButtons) {
            const btnData = btn.data || btn;
            if (btnData.style === ButtonStyle.Link || btnData.style === 5) {
                newButtons.addComponents(
                    new ButtonBuilder()
                        .setLabel(btnData.label)
                        .setURL(btnData.url)
                        .setStyle(ButtonStyle.Link)
                );
            } else {
                newButtons.addComponents(
                    new ButtonBuilder()
                        .setCustomId(btnData.custom_id || btnData.customId)
                        .setLabel(btnData.label)
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true)
                );
            }
        }

        container.addActionRowComponents(newButtons);

        await interaction.editReply({
            flags: MessageFlags.IsComponentsV2,
            components: [container],
            allowedMentions: { parse: [] },
        });

        await interaction.channel.send({ content: `**An luna lux vanitas** <@${applicantId}> <:al_levatio:1376685304005525585>\n-# May the lights guide you, so you may bask in its light as true **Levatio**` })
    },
};