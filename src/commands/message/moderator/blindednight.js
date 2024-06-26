const { EmbedBuilder } = require("discord.js");
module.exports = new Object({
    name: "blindednight",
    description: "blindednight.",
    category: "Moderator",
    usage: "",
    cooldown: 0,
    aliases: ['ban'],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: ['ManageGuild'],
        user: ['BanMembers'],
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
                `**${message.author.username}**, Please mention the person who you want to ban.`
            );
        }
        if (target.id === message.guild.ownerId) {
            return message.channel.send("You cannot Ban The Server Owner");
        }
        if (target.id === message.author.id) {
            return message.channel.send(
                `**${message.author.username}**, You can not ban yourself!`
            );
        }
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Oops, the ban-hammer already landed on them";
        let embed = new EmbedBuilder()
            .setAuthor({ name: `ID ${target.id}`, iconURL: 'https://i.imgur.com/oZvnuem.png' })
            .setDescription(`**${target.displayName} get BANNED from the sanctuary**\nReason: *${reason}*`)
            .setImage("https://i.imgur.com/rG7qwId.gif")
            .setFooter({ text: `Banned by ${message.member.displayName}` })
            .setColor(client.config.embedColorTrans)
        await message.guild.bans.create(target, {
            reason: reason
        }).then(() => {
            message.guild.channels.cache.get('839417251470901279').send({ embeds: [embed] })
        });
        message.react("✅").catch((e) => { });
    }
});