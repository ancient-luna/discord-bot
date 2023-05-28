const { EmbedBuilder } = require("discord.js");
const util = require('../utils/index');

/**
 *  @param {import("../structures/BotClient")} client
 * @param {import('discord.js').GuildMember} member
 * 
 */
async function sendWelcome(client, member) {
    if (member.user.bot) return;
    const role = member.guild.roles.cache.get(client.config.luxCastaId);
    await member.roles.add(role.id).catch((err) => util.printLog('error', err));
    const channel = member.guild.channels.cache.get(client.config.gatewayChannel);
    const welcomeText = new EmbedBuilder()
        .setTitle(`Welcome to ${member.guild.name}`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setDescription(`<@${member.user.id}> please understand our **wisdom of lleud** at ${member.guild.channels.cache.get(rulesChannelId).toString()} as you make your way through this warm sanctuary`)
        .setFooter({ text: `${member.user.tag} visited the sanctuary`, iconURL: member.user.displayAvatarURL({ dynamic: true, size: 512 }) })
        .setColor('7289da');
    return channel.send({ embeds: [welcomeText] });
};

module.exports = {
    sendWelcome,
};