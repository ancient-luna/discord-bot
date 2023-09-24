
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
module.exports = new Object({
    name: "watchtogether",
    description: "watchtogether.",
    category: "Entertainment",
    usage: "",
    cooldown: 0,
    aliases: [''],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
        user: [],
        dev: false,
    },
    player: { voice: false, active: false, dj: false, },
    /**
     * 
     * @param {import("../../../index")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {
        let channel = message.member.voice.channel;
        if (!channel) return message.reply(`You have to be in any **voice channel** first in this server`).catch((e) => { });
        client.discordTogether
            .createTogetherCode(channel.id, 'youtube')
            .then((invite) =>
                message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`Get your snacks and relax 🍿`)
                            .setDescription(`**${message.author.username}** has started **[YouTube Together](${invite.code})** in <#${channel.id}>\nWatch YouTube videos without ads in Ancient Luna`)
                            .setFooter({ text: `Mobile ver. not supported`, iconURL: 'https://i.imgur.com/7WAJS44.png' })
                            .setColor('ed0000')
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setStyle(ButtonStyle.Link)
                                    .setLabel("Join and start watch together")
                                    .setURL(invite.code)
                            )
                    ]
                }).catch((e) => { })
            )
    }
});












