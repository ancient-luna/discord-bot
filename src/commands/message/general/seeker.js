const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
const { profileImage } = require('discord-arts');

module.exports = new Object({
    name: "seeker",
    description: "giving member information",
    category: "general",
    cooldown: 0,
    usage: "",
    aliases: ['profile', 'avatar'],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
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

        const loadingTxt = await message.reply(`Getting profile <a:_util_loading:863317596551118858>`);

        try {
            const member = message.mentions.members.first() || message.member;
            const fetchedMembers = await message.guild.members.fetch();
            
            let status = member.presence?.status || 'offline';

            const profileBuffer = await profileImage(member.id, {
                overwriteBadges: true,
                customBadges: ['src/assets/badge/ancientluna.png'],
                moreBackgroundBlur: true,
                removeBorder: true,
                presenceStatus: status
            });
            const imageAttachment = new AttachmentBuilder(profileBuffer, { name: `profile.png` });

            const joinPosition = Array.from(fetchedMembers
                .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
                .keys())
                .indexOf(member.id) + 1;

            const everyoneRole = message.guild.roles.cache.find(role => role.name === '@everyone');
            const topRoles = member.roles.cache
                .filter(role => role !== everyoneRole)
                .sort((a, b) => b.position - a.position)
                .map(role => role)
                // .slice(0, 3);

            const joinTime = parseInt(member.joinedTimestamp / 1000);
            const createdTime = parseInt(member.user.createdTimestamp / 1000);

            const Booster = member.premiumSince ? "<a:_ab_discord_boost_spin:965778537334312970> boosting" : "none";

            const avatarButton = new ButtonBuilder()
                .setLabel('Avatar')
                .setStyle(ButtonStyle.Link)
                .setURL(member.displayAvatarURL());

            const bannerButton = new ButtonBuilder()
                .setLabel('Banner')
                .setStyle(ButtonStyle.Link)
                .setURL((await member.user.fetch()).bannerURL() || 'https://example.com/default-banner.jpg');

            const row = new ActionRowBuilder()
                .addComponents(avatarButton, bannerButton);

            const Embed = new EmbedBuilder()
                .setTitle(`User Profile in ${message.guild.name}`)
                .setColor('Aqua')
                .setDescription(`<@${member.id}> joined as the ${addSuffix(joinPosition)} member of this server`)
                .setImage(`attachment://profile.png`)
                .addFields([
                    { name: "Account Created", value: `<t:${createdTime}:R>`, inline: true },
                    { name: "Joined Since", value: `<t:${joinTime}:D>`, inline: true },
                    { name: "Server Booster", value: `${Booster}`, inline: true },
                    { name: `Roles in ${message.guild.name}`, value: `${topRoles.join(" ").replace(`<@${message.guildId}>`)}`, inline: false },
                ])
                .setColor(client.config.embedColorTrans)
                // .setFooter({ text: `${member.id} (u) ${member.user.username}` })
                .setTimestamp()

            loadingTxt.edit({
                content: '⁣',
                embeds: [Embed],
                // components: [row],
                files: [imageAttachment]
            });

        } catch (error) {
            loadingTxt.edit({ content: "unable to show `profile` at the moment." });
            throw error;
        }
    }
});

function addSuffix(number) {
    if (number % 100 >= 11 && number % 100 <= 13)
        return number + "th";

    switch (number % 10) {
        case 1: return number + "st";
        case 2: return number + "nd";
        case 3: return number + "rd";
    }
    return number + "th";
};