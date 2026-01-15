const { EmbedBuilder, ContainerBuilder, TextDisplayBuilder, MediaGalleryBuilder, MessageFlags, AttachmentBuilder } = require("discord.js");
const path = require("path");

module.exports = new Object({
    name: "blindednight",
    description: "banning mentioned member",
    category: "moderator",
    usage: `blindednight <@user> [reason]`,
    cooldown: 0,
    aliases: ['ban'],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: {
        client: ['ManageGuild'],
        user: ['BanMembers'],
        dev: false,
    },
    player: { voice: false, active: false, dj: false, },

    async execute(client, message, args) {
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) {
            return message.channel.send(
                `**${message.author.username}**, Please \`mention the person\` who you want to ban.`
            );
        }
        if (target.id === message.guild.ownerId) {
            return message.channel.send("You cannot Ban the **Server Owner**");
        }
        if (target.id === message.author.id) {
            return message.channel.send(
                `**${message.author.username}**, You can not ban **yourself**`
            );
        }
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Oops, the ban-hammer already landed on them without a reason";

        const banHammerPath = path.join(__dirname, '../../../assets/react/banhammer.gif');
        const banHammerAttachment = new AttachmentBuilder(banHammerPath, { name: 'banHammer.gif' });

        let container = new ContainerBuilder()
        let textUser = new TextDisplayBuilder().setContent(`<:srv_denied:1334885383636521050> ${target.displayName} get \`BANNED\` from the sanctuary`)
        let textReason = new TextDisplayBuilder().setContent(`-# ${target.id} by <@${message.author.id}>\nReason: *${reason}*`)
        let banHammer = new MediaGalleryBuilder()
            .addItems([{
                type: 'image',
                media: {
                    url: 'attachment://banHammer.gif'
                }
            }]);
        container.addTextDisplayComponents(textUser)
        container.addMediaGalleryComponents(banHammer)
        container.addTextDisplayComponents(textReason)

        await message.guild.bans.create(target, {
            reason: reason
        }).then(() => {
            message.guild.channels.cache.get(client.config.gatewayChannel).send({
                flags: MessageFlags.IsComponentsV2,
                components: [container],
                files: [banHammerAttachment]
            })
        });
        message.react("<:srv_accepted:1334885365676507188>");
    }
});