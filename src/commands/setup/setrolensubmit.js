const { MessageEmbed, ReactionManager } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    const channel = '864556584818835456';
    const BlackDesertOnlineRole = message.guild.roles.cache.find(role => role.name === 'Black Spirit')
    const ApexLegendsRole = message.guild.roles.cache.find(role => role.name === 'Apex')
    const AdAstraAbyssosqueRole = message.guild.roles.cache.find(role => role.name === 'Ad Astra Abyssosque')

    const BlackDesertOnlineEmoji = '<:game_logo_bdo:861579805660151818>';
    const ApexLegendsEmoji = '<:game_logo_apex:861580082418417664>';
    const AdAstraAbyssosqueEmoji = '<:ancientluna_divinare_s:859034096192978965>';

    let embedGuidelines = new MessageEmbed()
        .setTitle("SUBMISSION GUIDELINES")
        .setDescription(`**GIVE FEEDBACK** *( !suggest your_suggestion )*\nType !suggest followed by your feedbacks, thoughts, or suggestions⁣\nExample !suggest ancestor need to awake 24/7\n\n**OPEN A TICKET** *( !applyticket )*\nType the command !applyticket and a room ticket will open for you`)
        .setColor("4f545c")
        .setThumbnail("https://i.imgur.com/beubYr6.gif")

    let embedRoles = new MessageEmbed()
        .setDescription(`**ALL CLAIMABLE ROLES IN SERVER** <:ancientluna_pure_server:878526120914468924>\n\n⁣The <@&856379808937410590> role only given to clan members in Dead Frontier game. You can apply to get this role by open a ticket for application.\n\n⁣${BlackDesertOnlineEmoji} <@&856380073745186876> for Black Desert Online\n${ApexLegendsEmoji} <@&861400119101095937> for Apex Legends\n\n${AdAstraAbyssosqueEmoji} <@&882350441864777769> for unlocking mature contents\n\nReact to any reaction that suits you for the game you love. By this you will unlock the hidden category in this server to meet another fellow seeker in this sanctuary`)
        .setColor("4f545c")

    await message.channel.send(embedGuidelines);
    let messageEmbed = await message.channel.send(embedRoles);
    messageEmbed.react(BlackDesertOnlineEmoji);
    messageEmbed.react(ApexLegendsEmoji);
    messageEmbed.react(AdAstraAbyssosqueEmoji);

    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;

        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.name === 'game_logo_bdo') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(BlackDesertOnlineRole);
                const addBDOmsg = new MessageEmbed()
                    .setDescription(`${reaction.message.guild.members.cache.get(user.id)}, role **<@&856380073745186876>** added!\nNow you can access **Black Desert Online** category in this server`)
                    .setColor("4f545c")
                message.channel.send(addBDOmsg).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'game_logo_apex') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(ApexLegendsRole);
                const addAPEXmsg = new MessageEmbed()
                    .setDescription(`${reaction.message.guild.members.cache.get(user.id)}, role **<@&861400119101095937>** added!\nNow you can access **Apex Legends** category in this server`)
                    .setColor("4f545c")
                message.channel.send(addAPEXmsg).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'ancientluna_divinare_s') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(AdAstraAbyssosqueRole);
                const addABYSSmsg = new MessageEmbed()
                    .setDescription(`${reaction.message.guild.members.cache.get(user.id)}, **<@&882350441864777769>** role added\nLust awaits in NSWF channel <#468372462699282443>`)
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
            if (reaction.emoji.name === 'game_logo_bdo') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(BlackDesertOnlineRole);
                const removeBDOmsg = new MessageEmbed()
                    .setDescription(`${reaction.message.guild.members.cache.get(user.id)}, role **<@&856380073745186876>** removed!\nYou have no longer access to **Black Desert Online** category in this server`)
                    .setColor("red")
                message.channel.send(removeBDOmsg).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'game_logo_apex') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(ApexLegendsRole);
                const removeAPEXmsg = new MessageEmbed()
                    .setDescription(`${reaction.message.guild.members.cache.get(user.id)}, role **<@&861400119101095937>** removed!\nYou have no longer access to **Apex Legends** category in this server`)
                    .setColor("red")
                message.channel.send(removeAPEXmsg).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'ancientluna_divinare_s') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(AdAstraAbyssosqueRole);
                const removeABYSSmsg = new MessageEmbed()
                    .setDescription(`${reaction.message.guild.members.cache.get(user.id)}, NSWF role **<@&882350441864777769>** removed\nYou are free from lusts from now on`)
                    .setColor("red")
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
    name: 'a'
}