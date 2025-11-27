const { EmbedBuilder } = require("discord.js");
module.exports = new Object({
    name: "sanctuary",
    description: "current server information",
    category: "general",
    usage: `sanctuary`,
    cooldown: 0,
    aliases: ['server'],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: { client: [], user: [], dev: false, },
    player: { voice: false, active: false, dj: false, },
    
    async execute(client, message, args) {
        
        const { guild } = message;
        const { ownerId, createdTimestamp } = guild;
        const serverDescription = guild.description || `This server doesn't have description`;
        const serverIcon = guild.iconURL();
        const serverBanner = guild.bannerURL({ format: "png", size: 4096 });  
        const serverName = guild.name;
        const roles = guild.roles.cache.size;
        const emojis = guild.emojis.cache.size;
        const owner = await guild.members.fetch(ownerId);
        const ownerUsername = owner.user.id;
        const botCount = guild.members.cache.filter(member => member.user.bot).size;
        const memberCount = guild.members.cache.filter(member => !member.user.bot).size;
        const textChannels = guild.channels.cache.filter((c) => c.type === 0).toJSON().length;
        const voiceChannels = guild.channels.cache.filter((c) => c.type === 2).toJSON().length;
        const categoryChannels = guild.channels.cache.filter((c) => c.type === 4).toJSON().length;

        const regionToCountry = { "us": "United States", "gb": "United Kingdom", "ca": "Canada", "au": "Australia", "de": "Germany", "fr": "France", };
        const region = guild.preferredLocale.toLowerCase();
        const country = regionToCountry[region] || region;

        let baseVerification = guild.verificationLevel;
        if (baseVerification == 0) baseVerification = "None";
        if (baseVerification == 1) baseVerification = "Low";
        if (baseVerification == 2) baseVerification = "Medium";
        if (baseVerification == 3) baseVerification = "High";
        if (baseVerification == 4) baseVerification = "Very High";

        let totalMemberCount = 0;
        client.guilds.cache.forEach(guild => {
            totalMemberCount += guild.members.cache.filter(member => !member.user.bot).size
        });

        const serverInfo = new EmbedBuilder()
            .setAuthor({ url: `https://discord.com/invite/Sbp2nt8QHe`, iconURL: serverIcon, name: serverName })
            .setTitle(`𝑺𝒆𝒓𝒗𝒆𝒓 𝑰𝒏𝒇𝒐𝒓𝒎𝒂𝒕𝒊𝒐𝒏 ✦`)
            .setThumbnail(serverIcon)
            .addFields(
                {name: `About`, value: `-# ${serverDescription}`, inline: false},
                {name: `Date Created`, value: `<t:${parseInt(createdTimestamp/ 1000)}:R>`, inline: true},
                {name: `Server Owner`, value: `<@${ownerUsername}> <:ico_owner:1369186022558269561>`, inline: true},
                {name: `Boosters`, value: `${guild.premiumSubscriptionCount} <:ico_nitro:1369190458357452802>`, inline: true},
                {name: `Category`, value: `${categoryChannels}`, inline: true},
                {name: `Channels`, value: `${textChannels} <:ico_chat:1369210205321166858> ${voiceChannels} <:icon_headphone:1369186550599913473>`, inline: true},
                {name: `Members`, value: `${memberCount} <:ico_member:1369189422846967818> ${botCount} <:ico_bot:1369189440647331870>`, inline: true},
                {name: `Emojis`, value: `${emojis}`, inline: true},
                {name: `Roles`, value: `${roles}`, inline: true},
                {name: `Verification`, value: `${baseVerification}`, inline: true},
            )
            .setColor(client.config.embedColorTrans)
            .setImage(serverBanner || null)
            .setTimestamp()
            // .setFooter({ text: `Requested by ${message.member.displayName}` })

        await message.reply({ embeds: [serverInfo] });

    }
});