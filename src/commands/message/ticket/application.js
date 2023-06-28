const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = new Object({
    name: "ticket",
    description: "applyticket.",
    category: "Ticket",
    usage: "",
    cooldown: 0,
    aliases: ['applyticket'],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: ['ManageGuild'],
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

        const guidelinesChannel = '864556584818835456'

        if (message.channel.id === guidelinesChannel) {
            const channel = await message.guild.channels.create({ name: `ticket-${message.author.username}` }).catch((err) => message.channel.send("Channel in category is full! Cant open more tickets").catch((e) => { }))

            channel.setParent("1010531564586811453");

            const seekerID = message.guild.roles.cache.get("1000932479043125312");
            const lunariaID = message.guild.roles.cache.get("839170815932891197");

            channel.permissionOverwrites.create(seekerID, {
                Administrator: true
            });

            channel.permissionOverwrites.create(lunariaID, {
                SendMessages: true,
                SendTTSMessages: true,
                ViewChannel: true,
                EmbedLinks: true,
                AttachFiles: true,
                ReadMessageHistory: true,
                UseExternalEmojis: true,
                AddReactions: false
            });

            channel.permissionOverwrites.create(message.guild.id, {
                ViewChannel: false
            });

            channel.permissionOverwrites.create(message.author, {
                SendMessages: true,
                SendTTSMessages: true,
                ViewChannel: true,
                EmbedLinks: true,
                AttachFiles: true,
                ReadMessageHistory: true,
                UseExternalEmojis: true,
                AddReactions: false
            });

            message.channel.send({ content: `your ticket opened in <#${channel.id}>` }).catch((e) => { })

            const mEmbed = new EmbedBuilder()
                .setAuthor({ name: `✦ ${message.author.username}'s ticket ✦`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setDescription(`**Thank you for your application.**\nThe Ancestor and the Elders will be here as soon as possible! If they are still alive out there. Please take your time while waiting`)
                .setFooter({ text: `note: Don't hesitate to mention them if need now ` })
                .setColor('2b2d31')

            const btnTicket = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId("btn-ticketmention")
                .setLabel("Mention Now")
                .setStyle(ButtonStyle.Success)
            )
            .addComponents(
                new ButtonBuilder()
                .setCustomId("btn-ticketclose")
                .setLabel("Close Ticket")
                .setStyle(ButtonStyle.Danger)
            );

            channel.send({ embeds: [mEmbed], components: [btnTicket] }).catch((e) => { });
        } else {
            return message.channel.send(`*You can't apply a ticket from here, go back to <#864556584818835456> to send!*`).then((msg) => {
                setTimeout(() => msg.delete().catch((e) => { }), 10000);
                setTimeout(() => message.delete().catch((e) => { }));
            }).catch((err) => {
                throw err;
            });
        }
    }
});


