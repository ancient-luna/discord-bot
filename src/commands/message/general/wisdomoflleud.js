const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ContainerBuilder, MediaGalleryBuilder, MessageFlags, TextDisplayBuilder, SeparatorSpacingSize, SeparatorBuilder } = require('discord.js');

module.exports = new Object({
    name: "wisdomoflleud",
    description: "whole Luna information that you might need to know",
    category: "general",
    cooldown: 0,
    usage: `wisdomoflleud`,
    aliases: ['help', 'about'],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: { client: [], user: [], dev: false, },
    player: { voice: false, active: false, dj: false, },

    async execute(client, message, args) {
        const serverButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("btn-helpcmd")
                .setLabel("Commands")
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setLabel("Server")
                .setStyle(ButtonStyle.Link)
                .setURL("https://discord.com/invite/MktSB4Kxgz"),
            new ButtonBuilder()
                .setLabel("Support")
                .setStyle(ButtonStyle.Link)
                .setURL("https://ko-fi.com/imdae"),
            new ButtonBuilder()
                .setLabel("YouTube")
                .setStyle(ButtonStyle.Link)
                .setURL("https://www.youtube.com/@ancientluna")
        );

        const prefixTag = '<:prefix_1:1464225293467390137><:prefix_2:1464225296059334708><:prefix_3:1464225297879793698>';

        const container = new ContainerBuilder()
        const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large });
        const textHeader = new TextDisplayBuilder().setContent(`# 우리는 마치 달을 만난 것처럼 달렸다`)
        // const headerImage = new MediaGalleryBuilder().addItems({ type: 'image', media: { url: 'https://i.imgur.com/c8QnpbX.gif' } });
        const textDetail = new TextDisplayBuilder().setContent(`I'm a relic, born from [@imsoondae](https://www.instagram.com/?/)'s will in pursuit of wisdom\nSustained by [3.14 denies π](https://github.com/orgs/3-14-denies-Pi)'s blessings through the ages`)
        const textPrefix = new TextDisplayBuilder().setContent(`-# current command ${prefixTag} is: \`!\``);

        container.addTextDisplayComponents(textHeader);
        // container.addMediaGalleryComponents(headerImage);
        container.addTextDisplayComponents(textDetail);
        container.addTextDisplayComponents(textPrefix);
        container.addSeparatorComponents(separator);
        container.addActionRowComponents(serverButton);

        message.reply({
            flags: MessageFlags.IsComponentsV2,
            components: [container],
            allowedMentions: { parse: [] },
        })
    }
});