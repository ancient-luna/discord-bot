const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
const { profileImage } = require('discord-arts');
module.exports = new Object({
    name: "seeker",
    description: "seeker.",
    category: "Entertainment",
    cooldown: 0,
    usage: "",
    aliases: ['profile'],
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
            const member = message.mentions.members.first();
            const fetchedMembers = await message.guild.members.fetch();

            if (!member) {
                message.react("❓").catch((e) => { });
                return loadingTxt.edit({ content: "Unable to find the member profile. Mention one" }).then((msg) => {
                    setTimeout(() => msg.delete().catch((e) => { }), 5000);
                });
            }
        
            const profileBuffer = await profileImage(member.id);
            const imageAttachment = new AttachmentBuilder(profileBuffer, { name: 'profile.png' });
        
            const joinPosition = Array.from(fetchedMembers
                .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
                .keys())
                .indexOf(member.id) + 1;
        
            const topRoles = member.roles.cache
                .sort((a, b) => b.position - a.position)
                .map(role => role)
                // .slice(0, 3);
        
            // const userBadges = member.user.flags.toArray();
        
            const joinTime = parseInt(member.joinedTimestamp / 1000);
            const createdTime = parseInt(member.user.createdTimestamp / 1000);
        
            const Booster = member.premiumSince ? "<a:_ab_discord_boost_spin:965778537334312970> active" : "none";
        
            const avatarButton = new ButtonBuilder()
                .setLabel('Avatar')
                .setStyle(5)
                .setURL(member.displayAvatarURL());
        
            const bannerButton = new ButtonBuilder()
                .setLabel('Banner')
                .setStyle(5)
                .setURL((await member.user.fetch()).bannerURL() || 'https://example.com/default-banner.jpg');
        
            const row = new ActionRowBuilder()
                .addComponents(avatarButton, bannerButton);
        
            const Embed = new EmbedBuilder()
                .setAuthor({ name: `${member.displayName}'s General Information`, iconURL: member.displayAvatarURL() })
                .setColor('Aqua')
                .setDescription(`On <t:${joinTime}:D>, <@${member.id}> joined as the **${addSuffix(joinPosition)}** member of this server.`)
                .setImage("attachment://profile.png")
                .addFields([
                    { name: "Account Created", value: `<t:${createdTime}:R>`, inline: true },
                    { name: "Joined Since", value: `<t:${joinTime}:R>`, inline: true },
                    // { name: "User ID", value: `${member.id}`, inline: true },
                    // { name: "Badges", value: `${addBadges(userBadges).join("")}`, inline: true },
                    { name: "Booster", value: `${Booster}`, inline: true },
                    { name: `Roles in ${message.guild.name}`, value: `${topRoles.join(" ").replace(`<@${message.guildId}>`)}`, inline: false },
                ])
                .setColor('2b2d31')
                .setFooter({ text: `ID: ${member.id}` })
        
            loadingTxt.edit({ content: '⁣', embeds: [Embed], components: [row], files: [imageAttachment] });
        
        } catch (error) {
            loadingTxt.edit({ content: "An error in the code" });
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
}

// function addBadges(badgeNames) {
//     if (!badgeNames.length) return ["X"];
//     const badgeMap = {
//         "ActiveDeveloper": "<:activedeveloper:1137081810656960512> ",
//         "BugHunterLevel1": "<:discordbughunter1:1137081819423064175>",
//         "BugHunterLevel2": "<:discordbughunter2:1137081823734800424>",
//         "PremiumEarlySupporter": "<:discordearlysupporter:1137081826872139876>",
//         "Partner": "<:discordpartner:1137081833612394569>",
//         "Staff": "<:discordstaff:1137081836829409362>",
//         "HypeSquadOnlineHouse1": "<:hypesquadbravery:1137081841761923184>", // bravery
//         "HypeSquadOnlineHouse2": "<:hypesquadbrilliance:1137081843620008007>", // brilliance
//         "HypeSquadOnlineHouse3": "<:hypesquadbalance:1137081838553276416>", // balance
//         "Hypesquad": "<:hypesquadevents:1137081846824452096>",
//         "CertifiedModerator": "<:olddiscordmod:1137081849131319336>",
//         "VerifiedDeveloper": "<:discordbotdev:1137081815799169084>",
//     };

//     return badgeNames.map(badgeName => badgeMap[badgeName] || '❔');
// }