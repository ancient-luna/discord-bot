module.exports = {
    name: 'messageReactionAdd',
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
                await reaction.message.guild.members.cache.get(user.id).roles.add(ToramOnlineRole)
                message.guild.channels.cache.get('952164768217706496').send({
                    content: `Welcome to ancient city of luna ${reaction.message.guild.members.cache.get(user.id)}, here get your <#952170767947272303> and start the journey with others <:xpot_toram_potum_cute_chilling:952260990085500978>`
                })
            }
            if (reaction.emoji.name === 'game_logo_bdo') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(BlackDesertOnlineRole)
            }
            if (reaction.emoji.name === 'game_logo_apex') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(ApexLegendsRole)
            }
            if (reaction.emoji.name === 'game_logo_df') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(DeadFrontierRole)
            }
            if (reaction.emoji.name === 'ancientluna_divinare_s') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(GiveawayRole)
            }
            if (reaction.emoji.name === 'game_logo_mc') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(MinecraftRole)
            }
            if (reaction.emoji.name === 'game_logo_valor') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(ValorRole)
            }
            if (reaction.emoji.name === 'vcon_warning') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(AdAstraAbyssosqueRole)
            }
            if (reaction.emoji.name === 'ancientluna_divinare') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(ServerBoostRole)
            }
        } else {
            return;
        }
    }
}