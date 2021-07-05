const { MessageEmbed, ReactionManager } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;
    
    const channel = '839206614007021668';
    const BlackDesertOnlineRole = message.guild.roles.cache.find(role => role.name === 'Agma')
    const ApexLegendsRole = message.guild.roles.cache.find(role => role.name === 'Apex')

    const BlackDesertOnlineEmoji = '<:game_logo_bdo:861579805660151818>';
    const ApexLegendsEmoji = '<:game_logo_apex:861580082418417664>';

    let embed = new MessageEmbed()
        .setAuthor("DIVINARE DEITY")
        .setDescription('**React** to any reaction that sutis you for the game you love. By this you will unlock the hidden category in this server to meet another fellow seeker in this sanctuary\n\n'
            + `${BlackDesertOnlineEmoji} <@&856380073745186876> for **Black Desert Online** /`
            + `${ApexLegendsEmoji} <@&861400119101095937> for **Apex Legends**\n⁣`)
        .addField(`SUBMITTING YOUR SUGGESTION`, '⁣\n**Type** the command `!suggest` followed by the feedback you want to send\n**Example** `!suggest` `ancestor need awake 24/7` in <#842069549675184189>')
        .setColor('2f3136')

    let messageEmbed = await message.channel.send(embed);
    messageEmbed.react(BlackDesertOnlineEmoji);
    messageEmbed.react(ApexLegendsEmoji);

    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;

        if (reaction.message.channel.id == channel) {
            const member = await message.guild.members.cache.get(user.id);
            if (!member) return;
            if (reaction.emoji.name === 'game_logo_bdo') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(BlackDesertOnlineRole);
                const addEmbed = new MessageEmbed()
                    .setAuthor("ROLE ADDED", `https://i.imgur.com/etMSX3u.png`)
                    .setDescription(`You have been gived **Agma** role and have access to **Black Desert Online** category`)
                    .setTimestamp()
                    .setColor("GREEN")
                    .setFooter("Ancient Luna")
                member.send(addEmbed)
            }
            if (reaction.emoji.name === 'game_logo_apex') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(ApexLegendsRole);
                const addEmbed = new MessageEmbed()
                    .setAuthor("ROLE ADDED", "https://i.imgur.com/BbW7VAX.png")
                    .setDescription(`You have been gived **Apex** role and have access to **Apex Legends** category`)
                    .setTimestamp()
                    .setColor("GREEN")
                    .setFooter("Ancient Luna")
                member.send(addEmbed)
            }
        } else {
            return;
        }
    });

    client.on('messageReactionRemove', async (reaction, user) => {
        if (reaction.message) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;

        if (reaction.message.channel.id == channel) {
            const member = await message.guild.members.cache.get(user.id);
            if (!member) return;
            if (reaction.emoji.name === 'game_logo_bdo') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(BlackDesertOnlineRole);
                const removeEmbed = new MessageEmbed()
                    .setAuthor("ROLE REMOVED", "https://i.imgur.com/etMSX3u.png")
                    .setDescription(`Your **Agma** role were taken away from you since you unreacted and has no longer access to **Black Desert Online category** anymore`)
                    .setTimestamp()
                    .setColor("RED")
                    .setFooter("Ancient Luna")
                member.send(removeEmbed)
            }
            if (reaction.emoji.name === 'game_logo_apex') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(ApexLegendsRole);
                const removeEmbed = new MessageEmbed()
                    .setAuthor("ROLE REMOVED", "https://i.imgur.com/BbW7VAX.png")
                    .setDescription(`Your **Apex** role were taken away from you since you unreacted and has no longer access to **Apex Legends** anymore`)
                    .setTimestamp()
                    .setColor("RED")
                    .setFooter("Ancient Luna")
                member.send(removeEmbed)
            }
        } else {
            return;
        }
    });
}

module.exports.help = {
    name: 'setrolensubmit'
}