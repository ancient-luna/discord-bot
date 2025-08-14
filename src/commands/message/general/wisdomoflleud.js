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
    /**
     * 
     * @param {import("../../../index")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {
        const serverButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId("btn-helpcmd")
            .setLabel("Commands")
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setLabel("Server")
            .setStyle(ButtonStyle.Link)
            .setURL("https://discord.com/invite/Sbp2nt8QHe"),
            new ButtonBuilder()
            .setLabel("Support")
            .setStyle(ButtonStyle.Link)
            .setURL("https://ko-fi.com/daexx"),
            new ButtonBuilder()
            .setLabel("YouTube")
            .setStyle(ButtonStyle.Link)
            .setURL("https://www.youtube.com/@ancientluna")
        );
    
        const container = new ContainerBuilder()
        const separator = new SeparatorBuilder({ spacing: SeparatorSpacingSize.Large });
        // const headerImage = new MediaGalleryBuilder().addItems({ type: 'image', media: { url: 'https://i.imgur.com/c8QnpbX.gif' } });
        const textDetail = new TextDisplayBuilder().setContent(`# 우리는 마치 달을 만난 것처럼 달렸다\nI'm a relic that was born by [@imsoondae](https://www.instagram.com/?/) to seek wisdom.\nBlessed by [@biglebomb](https://discordapp.com/users/306545868054593537) to be alive until now.`)
        const textPrefix = new TextDisplayBuilder().setContent(`-# current command prefix is: \`!\``);
    
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