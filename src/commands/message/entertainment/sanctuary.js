const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = new Object({
    name: "sanctuary",
    description: "sanctuary.",
    category: "Entertainment",
    cooldown: 0,
    usage: "",
    aliases: ['server'],
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
        
        const { guild } = message;
        const { ownerId, createdTimestamp } = guild;
        const serverDescription = guild.description || `This server doesn't have description`;
        const serverIcon = guild.iconURL();
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
            .setTitle(`Server information`)
            .setThumbnail(serverIcon)
            .addFields(
                {name: `About`, value: `${serverDescription}`, inline: false},
                {name: `Date Created`, value: `<t:${parseInt(createdTimestamp/ 1000)}:R>`, inline: true},
                {name: `Server Owner`, value: `<@${ownerUsername}>`, inline: true},
                {name: `Verification`, value: `${baseVerification}`, inline: true},
                {name: `Category`, value: `${categoryChannels}`, inline: true},
                {name: `Text Channels`, value: `${textChannels}`, inline: true},
                {name: `Voice Channels`, value: `${voiceChannels}`, inline: true},
                {name: `Bots`, value: `${botCount}`, inline: true},
                {name: `Members`, value: `${memberCount}`, inline: true},
                {name: `Emojis`, value: `${emojis}`, inline: true},
                {name: `Roles`, value: `${roles}`, inline: true},
                {name: `Boosters`, value: `${guild.premiumSubscriptionCount}`, inline: true},
                {name: `Server Region`, value: `${country}`, inline: true}
            )
            .setColor('2b2d31')
            .setTimestamp()
            .setFooter({ text: `Requested by ${client.user.username}` })

        await message.reply({ embeds: [serverInfo] });

    }
});





