const { EmbedBuilder } = require("discord.js");
module.exports = new Object({
    name: "dimmedlight",
    description: "kicking mentioned member",
    category: "moderator",
    usage: "",
    cooldown: 0,
    aliases: ['kick'],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: ['ManageGuild'],
        user: ['KickMembers'],
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
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!target) {
            return message.channel.send(
                `**${message.author.username}**, Please \`mention the person\` who you want to kick`
            );
        }

        if (target.id === message.guild.ownerId) {
            return message.channel.send("You cannot kick the `Server Owner`");
        }

        if (target.id === message.author.id) {
            return message.channel.send(
                `**${message.author.username}**, You can not kick \`yourself\``
            );
        }

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason given";

        let embed = new EmbedBuilder()
            .setAuthor({ name: `ID ${target.id}` })
            .setDescription(`**${target.displayName} get kicked from the sanctuary**\nReason: *${reason}*`)
            .setThumbnail("https://i.imgur.com/sm8OXMp.png")
            .setFooter({ text: `Kicked by ${message.member.displayName}` })
            .setColor('Red')
        message.guild.channels.cache.get('839417251470901279').send({ embeds: [embed] });
        target.kick(args[0]);
        message.react("✅");
    }
});