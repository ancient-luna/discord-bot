const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, LabelBuilder, MessageFlags, ContainerBuilder, TextDisplayBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MediaGalleryBuilder } = require("discord.js");
const axios = require("axios");
const jsdom = require("jsdom");

module.exports = {
    name: "clanform",
    id: "btn-clanform",
    permissions: {
        client: [],
        user: [],
        dev: false,
    },

    execute: async (client, interaction, message) => {

        const txtModal = new ModalBuilder()
            .setCustomId(`cForm-${interaction.user.id}`)
            .setTitle(`Levatio Clan Form`);

        const dfpID = new TextInputBuilder()
            .setCustomId('dfpID')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const dfpLabel = new LabelBuilder()
            .setLabel('Dead Frontier Profile (ID)')
            .setTextInputComponent(dfpID);

        const inClanSelect = new StringSelectMenuBuilder()
            .setCustomId('inClan')
            .setPlaceholder('Select an option')
            .setRequired(true)
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Yes, I am already in the clan')
                    .setValue('yes'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('No, I am not in the clan yet')
                    .setValue('no'),
            );

        const inClanLabel = new LabelBuilder()
            .setLabel('Are you already in the clan in-game?')
            .setStringSelectMenuComponent(inClanSelect);

        const clanActivity = new TextInputBuilder()
            .setCustomId('clanActivity')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(false)
            .setMaxLength(666)
            .setPlaceholder('No need to fill this if you are already in the clan');

        const activityLabel = new LabelBuilder()
            .setLabel('How active are you in the game?')
            .setTextInputComponent(clanActivity);

        txtModal.addLabelComponents(dfpLabel, inClanLabel, activityLabel);

        await interaction.showModal(txtModal);

        const filter = (i) => i.customId === `cForm-${interaction.user.id}`;

        interaction
            .awaitModalSubmit({ filter, time: 300_000 })
            .then(async (modalInteraction) => {
                const dfpID = modalInteraction.fields.getTextInputValue('dfpID');
                const inClan = modalInteraction.fields.getStringSelectValues('inClan');
                const clanActivity = modalInteraction.fields.getTextInputValue('clanActivity');

                const inClanStatus = inClan.includes('yes') ? 'Already being **a member of Luna Levatio** clan <:al_levatio:1376685304005525585>' : '**Not a member** of Luna Levatio clan';

                const timestamp = Date.now();

                const option = {
                    url: `https://www.dfprofiler.com/profile/json/${dfpID}?_=${timestamp}`,
                    headers: {
                        "X-Requested-With": "XMLHttpRequest"
                    }
                };

                let username;
                try {
                    const response = await axios(option);
                    const body = response.data;

                    let stat = body;

                    const domUsername = new jsdom.JSDOM(stat['username']);
                    const anchorEl = domUsername.window.document.querySelector("a");
                    username = anchorEl ? anchorEl.textContent : domUsername.window.document.body.textContent?.trim() || stat['username'];
                } catch (e) {
                    username = null;
                }

                if (!username) return modalInteraction.reply({
                    content: 'Could not find the user. Please check the ID again',
                    flags: MessageFlags.Ephemeral,
                });

                const container = new ContainerBuilder()
                const headerText = new TextDisplayBuilder().setContent(`-# <@${modalInteraction.user.id}> member role request:`)
                const dfpImage = new MediaGalleryBuilder()
                    .addItems([{
                        type: 'image',
                        media: {
                            url: `https://www.dfprofiler.com/signaturereplicate.php?profile=${dfpID}&imgur=1HfGxh2`
                        }
                    }])
                const inClanText = new TextDisplayBuilder().setContent(`-# ${inClanStatus}`)
                const activityText = new TextDisplayBuilder().setContent(`Activity: ${clanActivity || 'N/A'}`)
                const formButton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('btn-clanaccept')
                            .setLabel('Accept')
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setCustomId('btn-clandecline')
                            .setLabel('Decline')
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setLabel(`${username} DFP`)
                            .setURL(`https://www.dfprofiler.com/profile/view/${dfpID}`)
                            .setStyle(ButtonStyle.Link)
                    )
                container.addTextDisplayComponents(headerText)
                container.addMediaGalleryComponents(dfpImage)
                container.addTextDisplayComponents(inClanText)
                container.addTextDisplayComponents(activityText)
                container.addActionRowComponents(formButton)

                const dfChannel = client.config.deadfrontierChannel;

                await modalInteraction.reply({
                    content: `Your clan application has been submitted to <#${dfChannel}> successfully`,
                    flags: MessageFlags.Ephemeral,
                });

                const targetChannel = await client.channels.fetch(client.config.deadfrontierChannel);
                if (targetChannel) {
                    await targetChannel.send({ flags: MessageFlags.IsComponentsV2, components: [container], allowedMentions: { parse: [] } });
                }

            })
            .catch((e) => { });
    },
};
