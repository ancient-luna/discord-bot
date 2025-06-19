const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const canvafy = require('canvafy');

module.exports = new Object({
    name: "guildMemberAdd",
    /**
     * @param {import("../index")} client
     * @param {import('discord.js').GuildMember|import('discord.js').PartialGuildMember} member
     */
    async execute(client, member) {
        // if (member.user.bot) return;
        const role = member.guild.roles.cache.get(client.config.luxcastaRole);
        if (!role) return;
        await member.roles.add(role).catch((err) => util.printLog('error', err));
        const baseUsername = member.user.username;
        const memberUsername = baseUsername.length > 20 ? baseUsername.slice(0, 17) + '...' : baseUsername;
        const channel = member.guild.channels.cache.get(client.config.gatewayChannel);
        const card = await new canvafy.WelcomeLeave()
            .setAvatar(member.user.displayAvatarURL({ size: 4096 }))
            .setAvatarBorder('#82AADC')
            .setTitle(memberUsername,'#82AADC')
            .setDescription('we ran as if to meet the moon')
            .setBackground('image','https://ik.imagekit.io/al/welcomemsg.png')
            .build();
        const cardBuffer = Buffer.from(card);
        const attachment = new AttachmentBuilder(cardBuffer, { name: `${member.user.id}.png` });
        const welcomeText = new EmbedBuilder()
            .setTitle(`Welcome to ${member.guild.name}`)
            // .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setDescription(`<@${member.user.id}> please understand our **wisdom of lleud** at ${member.guild.channels.cache.get(client.config.ruleChannel).toString()} as you make your way through this warm sanctuary`)
            .setFooter({ text: `(u) ${member.user.username} visited the sanctuary` })
            .setColor('7289da')
            .setImage(`attachment://${member.user.id}.png`)
            .setTimestamp();
        return channel.send({ embeds: [welcomeText], files: [attachment] });
    }
});