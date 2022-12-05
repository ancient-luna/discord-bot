const { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    const channelServerRole = '864556584818835456';
    
    const ToramOnlineRole = message.guild.roles.cache.find(role => role.name === 'Legendary Saviour')
    const BlackDesertOnlineRole = message.guild.roles.cache.find(role => role.name === 'Ancient Civilizations')
    const ApexLegendsRole = message.guild.roles.cache.find(role => role.name === 'Apex')
    const DeadFrontierRole = message.guild.roles.cache.find(role => role.name === 'Survivors')
    const GiveawayRole = message.guild.roles.cache.find(role => role.name === 'Candescence')
    const MinecraftRole = message.guild.roles.cache.find(role => role.name === 'Mooncraft')
    const ValorRole = message.guild.roles.cache.find(role => role.name === 'Valor')
    const AdAstraAbyssosqueRole = message.guild.roles.cache.find(role => role.name === 'Ad Astra Abyssosque')
    const ServerBoostRole = message.guild.roles.cache.find(role => role.name === 'Radiance')

    const ToramOnlineEmoji = '<:game_logo_toram:952247863075823666>';
    const BlackDesertOnlineEmoji = '<:game_logo_bdo:861579805660151818>';
    const ApexLegendsEmoji = '<:game_logo_apex:861580082418417664>';
    const DeadFrontierEmoji = '<:game_logo_df:861580085000798229>';
    const GiveawayEmoji = '<:ancientluna_divinare_s:859034096192978965>';
    const MooncraftEmoji = '<:game_logo_mc:981470249792712774>';
    const ValorEmoji = '<:game_logo_valor:981481044874252338>';
    const AdAstraAbyssosqueEmoji = '<a:_util_warning:965778540022878249>';
    const ServerBoostEmoji = '<:ancientluna_divinare:841754250949820416>';

    const IMGguide = new MessageAttachment("src/assets/guidelines.png")
    const IMGticket = new MessageAttachment("src/assets/ticketopen.png")
    const IMGroles = new MessageAttachment("src/assets/roleserver.png")

    let embedGuide = new MessageEmbed()
        .setTitle("Feedback / Suggestion")
        .setDescription(`Type !suggest followed by your feedbacks, thoughts, or suggestions⁣\nExample !suggest ancestor need to awake 24/7\n\n*!suggest your_suggestion*`)
        .setColor("#2f3136")

    let embedTicket = new MessageEmbed()
        .setDescription(`Type the command **!applyticket** and a room ticket will open for you`)
        .setColor("#2f3136")

    let embedRoles = new MessageEmbed()
        .setDescription(`You can apply to get this role by open a ticket for application:\n\n⁣The <@&907178060992876544> role only given to guild members in Toram Online game,\nwhile <@&873872221368647690> role given to guild alliances members\n\nReact to any reaction that suits you for the game you love:\n\n${ToramOnlineEmoji} <@&952147085447266364> for Toram Online\n⁣${BlackDesertOnlineEmoji} <@&856380073745186876> for Black Desert Online\n\n${ApexLegendsEmoji} <@&861400119101095937> for Apex Legends\n${DeadFrontierEmoji} <@&874680389459906580> for Dead Frontier\n${ValorEmoji} <@&981479474531024958> for Valorant\n\n${MooncraftEmoji} <@&981470521470382090> for Minecraft\n\n${AdAstraAbyssosqueEmoji} <@&882350441864777769> for unlocking nsfw contents\n\nBy this you will unlock the hidden category in this server to meet another light seekers in this sanctuary`)
        .setColor("#2f3136")

    await message.channel.send({ files: [IMGguide], embeds: [embedGuide] });
    await message.channel.send({ files: [IMGticket], embeds: [embedTicket] });
    let messageEmbed = await message.channel.send({ files: [IMGroles], embeds: [embedRoles] });
    messageEmbed.react(ToramOnlineEmoji);
    messageEmbed.react(BlackDesertOnlineEmoji);
    messageEmbed.react(ApexLegendsEmoji);
    messageEmbed.react(DeadFrontierEmoji);
    messageEmbed.react(GiveawayEmoji);
    messageEmbed.react(MooncraftEmoji);
    messageEmbed.react(ValorEmoji);
    messageEmbed.react(AdAstraAbyssosqueEmoji);
    messageEmbed.react(ServerBoostEmoji);

    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;

        if (reaction.message.channel.id === channelServerRole) {
            if (reaction.emoji.name === 'game_logo_toram') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(ToramOnlineRole);
                message.guild.channels.cache.get('952164768217706496').send({
                    content: `Welcome to ancient city of luna ${reaction.message.guild.members.cache.get(user.id)}, here get your <#952170767947272303> and start the journey with others <:xpot_toram_potum_cute_chilling:952260990085500978>`
                });
            }
            if (reaction.emoji.name === 'game_logo_bdo') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(BlackDesertOnlineRole);
                message.guild.channels.cache.get('1049228301807407156').send({
                    content: `Welcome to the hidden secrets of the ancient civilizations ${reaction.message.guild.members.cache.get(user.id)}, A journey to seek the true face of the ancient civilization around the Black Desert awaits you!`
                });
            }
            if (reaction.emoji.name === 'game_logo_apex') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(ApexLegendsRole);
            }
            if (reaction.emoji.name === 'game_logo_df') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(DeadFrontierRole);
            }
            if (reaction.emoji.name === 'ancientluna_divinare_s') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(GiveawayRole);
            }
            if (reaction.emoji.name === 'game_logo_mc') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(MinecraftRole);
            }
            if (reaction.emoji.name === 'game_logo_valor') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(ValorRole);
            }
            if (reaction.emoji.name === '_util_warning') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(AdAstraAbyssosqueRole);
            }
            if (reaction.emoji.name === 'ancientluna_divinare') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(ServerBoostRole);
            }
        } else {
            return;
        }
    })

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
                message.guild.channels.cache.get('1049228301807407156').send({
                    content: `A source of power so great they are said to have corrupted the minds of ${reaction.message.guild.members.cache.get(user.id)} caused the fall of a great civilization ...`
                });
            }
            if (reaction.emoji.name === 'game_logo_apex') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(ApexLegendsRole);
            }
            if (reaction.emoji.name === 'game_logo_df') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(DeadFrontierRole);
            }
            if (reaction.emoji.name === 'game_logo_mc') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(MinecraftRole);
            }
            if (reaction.emoji.name === 'ancientluna_divinare_s') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(GiveawayRole);
            }
            if (reaction.emoji.name === 'game_logo_valor') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(ValorRole);
            }
            if (reaction.emoji.name === '_util_warning') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(AdAstraAbyssosqueRole);
            }
            if (reaction.emoji.name === 'ancientluna_divinare') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(ServerBoostRole);
            }
        } else {
            return;
        }
    })
}

module.exports.help = {
    name: 'archived-test'
}