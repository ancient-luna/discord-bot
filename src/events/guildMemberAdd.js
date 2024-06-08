const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { Minimal } = require("greetify");

module.exports = new Object({
    name: "guildMemberAdd",
    /**
     * @param {import("../index")} client
     * @param {import('discord.js').GuildMember|import('discord.js').PartialGuildMember} member
     */
    async execute(client, member) {
        // if (member.user.bot) return;
        const role = member.guild.roles.cache.get(client.config.luxCastaId);
        await member.roles.add(role.id).catch((err) => util.printLog('error', err));
        const channel = member.guild.channels.cache.get(client.config.gatewayChannel);
        const card = await Minimal({
            avatar: member.user.displayAvatarURL({ size: 4096 }),
            name: member.user.username,
            nameColor: '#178EC7',
            type: 'WELCOME',
            typeColor: '#82AADC',
            message: '우리는 마치 달을 만난 것처럼 달렸다',
            messageColor: '#82AADC',
            backgroundImage: 'https://i.imgur.com/folmlyl.png'
        })
        const cardBuffer = Buffer.from(card);
        const attachment = new AttachmentBuilder(cardBuffer, { name: 'gateway-pass.png' });
        const welcomeText = new EmbedBuilder()
            .setTitle(`Welcome to ${member.guild.name}`)
            // .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setDescription(`<@${member.user.id}> please understand our **wisdom of lleud** at ${member.guild.channels.cache.get(client.config.ruleChannel).toString()} as you make your way through this warm sanctuary`)
            .setFooter({ text: `(u) ${member.user.username} visited the sanctuary` })
            .setColor('7289da')
            .setImage('attachment://gateway-pass.png')
            .setTimestamp();
        return channel.send({ embeds: [welcomeText], files: [attachment] });
    }
})