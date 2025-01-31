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
            .setTitle(`Dev. Support Contacts <:sc_verified:1334889120849330266>`)
            .setDescription(`> Discord: asonofbiscuit - [ancientluna](https://discord.com/channels/447069790150852609/1162410164356390912)\n> ~~dae@ancientluna.org~~ <:sc_ins:1334889482633084989> ~~**IG**~~`)
            .setFooter({ text: `this bot won't read any messages of your replies` })
            .setColor(client.config.embedColorTrans)
            .setThumbnail('https://i.imgur.com/vfx9TEB.png') // aevoa
            // .setImage('https://i.imgur.com/4uS7mor.png') // aevoa
            .setTimestamp()

        const btnServer = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel("Web")
                    .setURL(`https://www.bdo.ancientluna.org`),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel("Video")
                    .setURL(`https://www.youtube.com/@ancientluna`),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel("Steam Group")
                    .setURL(`https://steamcommunity.com/groups/xxmoon`)
            )

        let successful = 0;
        let failed = 0;
        let promises = [];

        message.guild.members.cache.forEach(member => {
            if (member.roles.cache.has(role.id)) {
                promises.push(member.send({
                    content: `Dear **Lunar Disciples**,\n${str}\n\nWarmest regards,\n**Aevoa**\n_ _`,
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
                    .setDescription(`<:srv_accept:1334881070449164378> Message sent successfully to ${successful} members <:srv_deny:1334881089205829674> Failed to send to ${failed} members.`)
                    .setColor(client.config.embedColorTrans)
                message.channel.send({ embeds: [statusEmbed] });
            })
            .catch((err) => {
                console.error("Error while sending messages:", err);
                message.reply("An error occurred while sending messages. Please try again later.");
            });
    }
});