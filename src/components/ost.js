const { ContainerBuilder, TextDisplayBuilder, MessageFlags, AttachmentBuilder, FileBuilder, SeparatorSpacingSize, SeparatorBuilder } = require("discord.js");

module.exports = {
    name: "ost",
    id: "btn-ost",
    permissions: {
        client: [],
        user: [],
        dev: false,
    },

    execute: async (client, interaction) => {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        const tag = `<:tagluna_1:1463427903810306244><:tagluna_2:1463427907354624139><:tagluna_3:1463427909976068211>`
        const tagOST = `<:tagost_1:1463428293029265428><:tagost_2:1463428295335874682><:tagost_3:1463428297307197440><:tagost_4:1463428299089907744><:tagost_5:1463428300943659018><:tagost_6:1463428302843936871><:tagost_7:1463428304844619807>`
        const title = `## 𝖂𝖊 𝕲𝖆𝖙𝖍𝖊𝖗 𝕺𝖓𝖈𝖊 𝕬𝖌𝖆𝖎𝖓`
        const lyrics = `When daylight fades from silver skies\nWe gather where the moonlight lies\nOld names spoken, new bonds formed\nBy ancient stars, our path is sworn\n\n-# [Melodic Refrain]\n\nAncient Luna, guide our way\nThrough quiet night and dawn’s first ray\n\nNo throne above, no crown to chase\nOnly trust and shared embrace\nBy blade or spell, by hand or heart\nTogether still, we never part\n\nAncient Luna, calm and true\nOne moon, one sky, and one in you`;

        // const container = new ContainerBuilder()
        // const separator = new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large)
        // const textTitle = new TextDisplayBuilder().setContent(title)
        // const textLyrics = new TextDisplayBuilder().setContent(lyrics)

        const audioSource = 'src/assets/luna+ ost. we gather once more.mp3';
        const attachmentName = 'luna_ost_we_gather_once_more.mp3';
        const attachment = new AttachmentBuilder(audioSource, { name: attachmentName });
        // const file = new FileBuilder().setURL(`attachment://${attachmentName}`);


        // container.addTextDisplayComponents(textTitle)
        // container.addSeparatorComponents(separator)
        // container.addTextDisplayComponents(textLyrics)
        // container.addFileComponents(file);

        // await interaction.reply({
        //     flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral],
        //     components: [container],
        //     files: [attachment]
        // });

        await interaction.editReply({
            content: `${title}\n-# ${tag}${tagOST}\n\n${lyrics}\n_ _`,
            files: [attachment]
        })
    },
};