const { EmbedBuilder } = require("discord.js");
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
        const channel = await message.guild.channels.create(`ticket-${message.author.username}`).catch((err) => message.channel.send("I do not have permission to create a channel!").catch((e) => { }))

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

        const openTicket = new EmbedBuilder()
            .setAuthor({ name: `${message.author.tag}: A TICKET OPENED`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setDescription(`Click <#${channel.id}> to see your application ticket`)
            .setFooter({ text: `this notification message will be deleted in 10 seconds`, iconURL: 'https://i.imgur.com/26tcTpL.gif' })
            .setColor('2b2d31')

        message.channel.send({ embeds: [openTicket] }).then((msg) => {
            setTimeout(() => msg.delete().catch((e) => { }), 10000);
            setTimeout(() => message.delete().catch((e) => { }));
        }).catch((err) => {
            throw err;
        })

        const mEmbed = new EmbedBuilder()
            .setAuthor({ name: `${message.author.username}'s ticket`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setDescription(`Thank you for your application. The Ancestor will be here as soon as possible! If he still alive out there. Please take your time while waiting`)
            .setFooter({ text: `note: Don't hesitate to mention him if need now ` })
            .setColor('2b2d31')

        const m = await channel.send({ embeds: [mEmbed] }).catch((e) => { });

        try {
            await m.react("🗂️");
            await m.react("📛");
        } catch (err) {
            channel.send("Error sending emojis").catch((e) => { });
            throw err;
        }

        const collector = m.createReactionCollector(
            (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).permissions.has("ManageMessages"),
            { dispose: true }
        );
        collector.on('collect', (reaction, user) => {
            if (user.bot) return
            if (user.id !== message.author.id)
                switch (reaction.emoji.name) {
                    case "🗂️":
                        channel.permissionOverwrites.create(message.author, { VIEW_CHANNEL: false }).catch((e) => { });
                        break;
                    case "📛":
                        channel.send({ content: 'Closing ticket in 5 seconds <a:_util_loading:863317596551118858>' }).catch((e) => { });
                        setTimeout(() => channel.delete().catch((e) => { }), 5000);
                        break;
                }
        })

        await message.delete().catch((e) => { });
    }
});


