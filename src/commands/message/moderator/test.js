const { ContainerBuilder, TextDisplayBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, MessageFlags } = require("discord.js");

module.exports = new Object({
    name: "test",
    description: "test",
    category: "moderator",
    usage: `test`,
    cooldown: 0,
    aliases: [],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
        user: [],
        dev: false,
    },
    player: { voice: false, active: false, dj: false, },

    async execute(client, message, args) {
        const container = new ContainerBuilder()
        const text = new TextDisplayBuilder().setContent("test")
        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("btn-ticketopen")
                .setLabel("Open ticket here test test test")
                .setStyle(ButtonStyle.Primary)
        )

        container.addTextDisplayComponents(text)
        container.addActionRowComponents(buttons)

        await message.channel.send({ flags: MessageFlags.IsComponentsV2, components: [container] })
    }
});