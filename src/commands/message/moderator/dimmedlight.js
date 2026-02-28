const { ContainerBuilder, TextDisplayBuilder, MediaGalleryBuilder, MessageFlags, AttachmentBuilder } = require("discord.js");
const path = require("path");

module.exports = new Object({
    name: "dimmedlight",
    description: "kicking mentioned member",
    category: "moderator",
    usage: `dimmedlight <@user> [reason]`,
    cooldown: 0,
    aliases: ['kick'],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: {
        client: ['ManageGuild'],
        user: ['KickMembers'],
        dev: false,
    },
    player: { voice: false, active: false, dj: false, },

    async execute(client, message, args) {
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!target) {
            return message.channel.send(
                `**${message.author.username}**, Please \`mention the person\` who you want to kick`
            );
        }

        if (target.id === message.guild.ownerId) {
            return message.channel.send("You cannot kick the **Server Owner**");
        }

        if (target.id === message.author.id) {
            return message.channel.send(
                `**${message.author.username}**, You can not kick **yourself**`
            );
        }

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Oops, the kick-hammer already landed on them without a reason";

        const sadMinionPath = path.join(__dirname, '../../../assets/react/sadminion.gif');
        const sadMinionAttachment = new AttachmentBuilder(sadMinionPath, { name: 'sadMinion.gif' });

        let container = new ContainerBuilder()
        let textUser = new TextDisplayBuilder().setContent(`<:srv_denied:1334885383636521050> ${target.displayName} get \`KICKED\` from the sanctuary`)
        let textReason = new TextDisplayBuilder().setContent(`-# ${target.id} by <@${message.author.id}>\n**Reason:** *${reason}*`)
        let sadMinion = new MediaGalleryBuilder()
            .addItems([{
                type: 'image',
                media: {
                    url: 'attachment://sadMinion.gif'
                }
            }]);
        container.addTextDisplayComponents(textUser)
        container.addMediaGalleryComponents(sadMinion)
        container.addTextDisplayComponents(textReason)
        message.guild.channels.cache.get(client.config.gatewayChannel).send({
            flags: MessageFlags.IsComponentsV2,
            components: [container],
            files: [sadMinionAttachment]
        });
        target.kick(args[0]);
        message.react("<:srv_accepted:1334885365676507188>");
    }
});