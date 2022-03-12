const { MessageEmbed, ReactionManager } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    const channel = '864556584818835456';
    const ToramOnlineRole = message.guild.roles.cache.find(role => role.name === 'Legendary Saviour')
    const BlackDesertOnlineRole = message.guild.roles.cache.find(role => role.name === 'Black Spirit')
    const ApexLegendsRole = message.guild.roles.cache.find(role => role.name === 'Apex')
    const AdAstraAbyssosqueRole = message.guild.roles.cache.find(role => role.name === 'Ad Astra Abyssosque')

    const ToramOnlineEmoji = '<:game_logo_toram:952247863075823666>';
    const BlackDesertOnlineEmoji = '<:game_logo_bdo:861579805660151818>';
    const ApexLegendsEmoji = '<:game_logo_apex:861580082418417664>';
    const AdAstraAbyssosqueEmoji = '<:ancientluna_divinare_s:859034096192978965>';

    let embedGuidelines = new MessageEmbed()
        .setTitle("SUBMISSION GUIDELINES")
        .setDescription(`**GIVE FEEDBACK** *( !suggest your_suggestion )*\nType !suggest followed by your feedbacks, thoughts, or suggestions⁣\nExample !suggest ancestor need to awake 24/7\n\n**OPEN A TICKET** *( !applyticket )*\nType the command !applyticket and a room ticket will open for you`)
        .setColor("4f545c")
        .setThumbnail("https://i.imgur.com/beubYr6.gif")

    let embedRoles = new MessageEmbed()
        .setDescription(`**ALL CLAIMABLE ROLES IN SERVER** <:ancientluna_pure_server:878526120914468924>\n\n⁣The <@&907178060992876544> role only given to guild members in Toram Online game <:xot_toram_guild:952260952324202498>\nYou can apply to get this role by open a ticket for application\n\n${ToramOnlineEmoji} <@&952147085447266364> for Toram Online\n⁣${BlackDesertOnlineEmoji} <@&856380073745186876> for Black Desert Online\n${ApexLegendsEmoji} <@&861400119101095937> for Apex Legends\n\n${AdAstraAbyssosqueEmoji} <@&882350441864777769> for unlocking nsfw contents\n\nReact to any reaction that suits you for the game you love. By this you will unlock the hidden category in this server to meet another light seekers in this sanctuary`)
        .setColor("4f545c")

    await message.channel.send(embedGuidelines);
    let messageEmbed = await message.channel.send(embedRoles);
    messageEmbed.react(ToramOnlineEmoji);
    messageEmbed.react(BlackDesertOnlineEmoji);
    messageEmbed.react(ApexLegendsEmoji);
    messageEmbed.react(AdAstraAbyssosqueEmoji);

    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;

        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.name === 'game_logo_toram') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(ToramOnlineRole);
                const addTORAMmsg = new MessageEmbed()
                    .setAuthor("ROLE ADDED", "https://i.imgur.com/tZCYzce.gif")
                    .setDescription(`You have been gived **Legendary Saviour** role and have access to **Departure from Iruna** category`)
                    .setFooter(`this notification message will be deleted in 5 seconds`, `https://i.imgur.com/26tcTpL.gif`)
                    .setColor("4f545c")
                message.channel.send(addTORAMmsg).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'game_logo_bdo') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(BlackDesertOnlineRole);
                const addBDOmsg = new MessageEmbed()
                    .setAuthor("ROLE ADDED", "https://i.imgur.com/etMSX3u.png")
                    .setDescription(`You have been gived **Black Spirit** role and have access to **Black Desert Online** category`)
                    .setFooter(`this notification message will be deleted in 5 seconds`, `https://i.imgur.com/26tcTpL.gif`)
                    .setColor("4f545c")
                message.channel.send(addBDOmsg).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'game_logo_apex') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(ApexLegendsRole);
                const addAPEXmsg = new MessageEmbed()
                    .setAuthor("ROLE ADDED", "https://i.imgur.com/BbW7VAX.png")
                    .setDescription(`You have been gived **Apex** role and have access to **Apex Legends** category`)
                    .setFooter(`this notification message will be deleted in 5 seconds`, `https://i.imgur.com/26tcTpL.gif`)
                    .setColor("4f545c")
                message.channel.send(addAPEXmsg).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'ancientluna_divinare_s') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(AdAstraAbyssosqueRole);
                const addABYSSmsg = new MessageEmbed()
                    .setAuthor("ROLE ADDED", "https://i.imgur.com/CAFo9qL.png")
                    .setDescription(`I felt like an animal, and animals don’t know sin, do they?\nYour memory feels like home to me in <#468372462699282443>`)
                    .setFooter(`this notification message will be deleted in 5 seconds`, `https://i.imgur.com/26tcTpL.gif`)
                    .setColor("4f545c")
                message.channel.send(addABYSSmsg).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
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
            if (reaction.emoji.name === 'game_logo_toram') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(ToramOnlineRole);
                const removeTORAMmsg = new MessageEmbed()
                    .setAuthor("ROLE REMOVED", "https://i.imgur.com/MjbykvH.gif")
                    .setDescription(`Your **Legendary Saviour** role were taken away from you since you unreacted and has no longer access to **Departure from Iruna** category anymore`)
                    .setFooter(`this notification message will be deleted in 5 seconds`, `https://i.imgur.com/26tcTpL.gif`)
                    .setColor("RED")
                message.channel.send(removeTORAMmsg).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'game_logo_bdo') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(BlackDesertOnlineRole);
                const removeBDOmsg = new MessageEmbed()
                    .setAuthor("ROLE REMOVED", "https://i.imgur.com/etMSX3u.png")
                    .setDescription(`Your **Black Spirit** role were taken away from you since you unreacted and has no longer access to **Black Desert Online** category anymore`)
                    .setFooter(`this notification message will be deleted in 5 seconds`, `https://i.imgur.com/26tcTpL.gif`)
                    .setColor("RED")
                message.channel.send(removeBDOmsg).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'game_logo_apex') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(ApexLegendsRole);
                const removeAPEXmsg = new MessageEmbed()
                    .setAuthor("ROLE REMOVED", "https://i.imgur.com/BbW7VAX.png")
                    .setDescription(`Your **Apex** role were taken away from you since you unreacted and has no longer access to **Apex Legends** category anymore`)
                    .setFooter(`this notification message will be deleted in 5 seconds`, `https://i.imgur.com/26tcTpL.gif`)
                    .setColor("RED")
                message.channel.send(removeAPEXmsg).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'ancientluna_divinare_s') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(AdAstraAbyssosqueRole);
                const removeABYSSmsg = new MessageEmbed()
                    .setAuthor("ROLE REMOVED", "https://i.imgur.com/CAFo9qL.png")
                    .setDescription(`People wait around too long for love. I'm happy with all of your lusts!`)
                    .setFooter(`this notification message will be deleted in 5 seconds`, `https://i.imgur.com/26tcTpL.gif`)
                    .setColor("RED")
                message.channel.send(removeABYSSmsg).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
        } else {
            return;
        }
    });

    message.delete()
}

module.exports.help = {
    name: 'setrolensubmit'
}