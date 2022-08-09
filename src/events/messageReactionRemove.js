module.exports = {
    name: 'messageReactionRemove',
    async execute(reaction, user) {

        const channelServerRole = '864556584818835456';
        
        const ToramOnlineRole = message.guild.roles.cache.find(role => role.name === 'Legendary Saviour')
        const BlackDesertOnlineRole = message.guild.roles.cache.find(role => role.name === 'Black Spirit')
        const ApexLegendsRole = message.guild.roles.cache.find(role => role.name === 'Apex')
        const DeadFrontierRole = message.guild.roles.cache.find(role => role.name === 'Survivors')
        const GiveawayRole = message.guild.roles.cache.find(role => role.name === 'Candescence')
        const MinecraftRole = message.guild.roles.cache.find(role => role.name === 'Mooncraft')
        const ValorRole = message.guild.roles.cache.find(role => role.name === 'Valor')
        const AdAstraAbyssosqueRole = message.guild.roles.cache.find(role => role.name === 'Ad Astra Abyssosque')
        const ServerBoostRole = message.guild.roles.cache.find(role => role.name === 'Radiance')

        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.channel.id === channelServerRole) {
            if (reaction.emoji.name === 'game_logo_toram') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(ToramOnlineRole)
                message.guild.channels.cache.get('952164768217706496').send(`<:xpot_toram_potum_sad:952260990337171467> ${reaction.message.guild.members.cache.get(user.id)} is leaving this city ...`)
            }
            if (reaction.emoji.name === 'game_logo_bdo') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(BlackDesertOnlineRole)
            }
            if (reaction.emoji.name === 'game_logo_apex') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(ApexLegendsRole)
            }
            if (reaction.emoji.name === 'game_logo_df') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(DeadFrontierRole)
            }
            if (reaction.emoji.name === 'game_logo_mc') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(MinecraftRole)
            }
            if (reaction.emoji.name === 'ancientluna_divinare_s') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(GiveawayRole)
            }
            if (reaction.emoji.name === 'game_logo_valor') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(ValorRole)
            }
            if (reaction.emoji.name === 'vcon_warning') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(AdAstraAbyssosqueRole)
            }
            if (reaction.emoji.name === 'ancientluna_divinare') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(ServerBoostRole)
            }
        } else {
            return;
        }
    }
}