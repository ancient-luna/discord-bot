const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
module.exports = new Object({
    name: "whisperer",
    description: "dm to all server members within mentioned roles",
    category: "moderator",
    usage: "",
    cooldown: 0,
    aliases: [''],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: ['ManageGuild'],
        user: ['ManageMessages'],
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
        if (args.length < 2) return message.channel.send("Do: !whisper `roleid` `message`");

        const roleId = args.shift();
        const role = message.guild.roles.cache.get(roleId);
        if (!role) return message.channel.send("`Role` not found!");

        const str = args.join(" ");

        const txtEmbed = new EmbedBuilder()
            .setTitle(`Dev. Contacts <:verified:1204724590950228008>`)
            .setDescription(`> Discord: axxae - [ancientluna](https://discord.com/invite/Sbp2nt8QHe)\n> dae@ancientluna.org <:ins:1204725582852788256> [everylttlething](https://instagram.com/everylttlething)`)
            .setFooter({ text: `this bot won't read any messages of your replies` })
            .setColor(client.config.embedColorTrans)
            .setThumbnail('https://i.imgur.com/veLhH04.png');

        const btnServer = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel("Chat with family")
                    .setEmoji('<:game_logo_bdo:861579805660151818>')
                    .setURL(`https://discord.com/channels/447069790150852609/1060992670035619931`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel("Web")
                    .setURL(`https://ancientluna.org`)
            )
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel("Videos")
                    .setURL(`https://www.youtube.com/@ancientluna/about`)
            );

        let successful = 0;
        let failed = 0;
        let promises = [];

        message.guild.members.cache.forEach(member => {
            if (member.roles.cache.has(role.id)) {
                promises.push(member.send({
                    content: `Dear **Lunar Disciples**,\n${str}\n\nWarmest regards,\n[**Aevoa**](https://steamcommunity.com/id/axxae/)\n_ _`,
                    embeds: [txtEmbed],
                    components: [btnServer]
                }).then(() => {
                    successful++;
                }).catch((e) => {
                    if (e.code === 50007) {
                        failed++;
                        message.reply(`Can't send to <@${member.user.id}> because they have DMs disabled.`);
                    } else {
                        failed++;
                        message.reply(`${e}`);
                    }
                }));
            }
        });

        Promise.all(promises)
            .then(() => {
                const statusEmbed = new EmbedBuilder()
                    .setDescription(`<:check:1222439148720361502> Message sent successfully to ${successful} members <:wrong:1222439146593849425> Failed to send to ${failed} members.`)
                    .setColor(client.config.embedColorTrans)
                message.channel.send({ embeds: [statusEmbed] });
            })
            .catch((err) => {
                console.error("Error while sending messages:", err);
                message.reply("An error occurred while sending messages. Please try again later.");
            });
    }
});