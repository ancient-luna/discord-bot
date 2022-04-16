const { MessageEmbed, ReactionManager, MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    const channelServerRole = '864556584818835456';
    
    const ToramOnlineRole = message.guild.roles.cache.find(role => role.name === 'Legendary Saviour')
    const BlackDesertOnlineRole = message.guild.roles.cache.find(role => role.name === 'Black Spirit')
    const ApexLegendsRole = message.guild.roles.cache.find(role => role.name === 'Apex')
    const DeadFrontierRole = message.guild.roles.cache.find(role => role.name === 'Survivors')
    const AdAstraAbyssosqueRole = message.guild.roles.cache.find(role => role.name === 'Ad Astra Abyssosque')

    const ToramOnlineEmoji = '<:game_logo_toram:952247863075823666>';
    const BlackDesertOnlineEmoji = '<:game_logo_bdo:861579805660151818>';
    const ApexLegendsEmoji = '<:game_logo_apex:861580082418417664>';
    const DeadFrontierEmoji = '<:game_logo_df:861580085000798229>';
    const AdAstraAbyssosqueEmoji = '<:ancientluna_divinare_s:859034096192978965>';

    const IMGroles = new MessageAttachment("src/assets/roleserver.png")

    let embedRoles = new MessageEmbed()
        .setDescription(`You can apply to get this role by open a ticket for application:\n\n⁣The <@&907178060992876544> role only given to guild members in Toram Online game,\nwhile <@&873872221368647690> role given to guild alliances members\n\nReact to any reaction that suits you for the game you love:\n\n${ToramOnlineEmoji} <@&952147085447266364> for Toram Online\n⁣${BlackDesertOnlineEmoji} <@&856380073745186876> for Black Desert Online\n${ApexLegendsEmoji} <@&861400119101095937> for Apex Legends\n${DeadFrontierEmoji} <@&874680389459906580> for Dead Frontier\n\n${AdAstraAbyssosqueEmoji} <@&882350441864777769> for unlocking nsfw contents\n\nBy this you will unlock the hidden category in this server to meet another light seekers in this sanctuary`)
        .setColor("#2f3136")

    let messageEmbed = await message.guild.channels.cache.get('864556584818835456').send({ files: [IMGroles], embeds: [embedRoles] });
    messageEmbed.react(ToramOnlineEmoji);
    messageEmbed.react(BlackDesertOnlineEmoji);
    messageEmbed.react(ApexLegendsEmoji);
    messageEmbed.react(DeadFrontierEmoji);
    messageEmbed.react(AdAstraAbyssosqueEmoji);

    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;

        if (reaction.message.channel.id === channelServerRole) {
            if (reaction.emoji.name === 'game_logo_toram') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(ToramOnlineRole);
                message.guild.channels.cache.get('952164768217706496').send(`A legendary saviour known as ${reaction.message.guild.members.cache.get(user.id)} just departured from Iruna to this ancient city of luna <:xpot_toram_potum_cute_chilling:952260990085500978>`);
            }
            if (reaction.emoji.name === 'game_logo_bdo') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(BlackDesertOnlineRole);
            }
            if (reaction.emoji.name === 'game_logo_apex') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(ApexLegendsRole);
            }
            if (reaction.emoji.name === 'game_logo_df') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(DeadFrontierRole);
            }
            if (reaction.emoji.name === 'ancientluna_divinare_s') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(AdAstraAbyssosqueRole);
            }
        } else {
            return;
        }
    });

    client.on('messageReactionRemove', async (reaction, user) => {
        if (reaction.message) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;

        if (reaction.message.channel.id === channelServerRole) {
            if (reaction.emoji.name === 'game_logo_toram') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(ToramOnlineRole);
                message.guild.channels.cache.get('952164768217706496').send(`<:xpot_toram_potum_sad:952260990337171467> ${reaction.message.guild.members.cache.get(user.id)} is leaving this city ...`);
            }
            if (reaction.emoji.name === 'game_logo_bdo') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(BlackDesertOnlineRole);
            }
            if (reaction.emoji.name === 'game_logo_apex') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(ApexLegendsRole);
            }
            if (reaction.emoji.name === 'game_logo_df') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(DeadFrontierRole);
            }
            if (reaction.emoji.name === 'ancientluna_divinare_s') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(AdAstraAbyssosqueRole);
            }
        } else {
            return;
        }
    });
}

module.exports.help = {
    name: 'setroleserver'
}