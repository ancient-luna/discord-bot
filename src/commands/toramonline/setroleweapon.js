const { MessageEmbed, ReactionManager } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    const channel = '952170767947272303';

    const BOWrole = message.guild.roles.cache.find(role => role.name === 'Bow Wielder')
    const CBrole = message.guild.roles.cache.find(role => role.name === 'Bowgun Wielder')
    const DSrole = message.guild.roles.cache.find(role => role.name === 'Dual Sword Wielder')
    const KNUCKrole = message.guild.roles.cache.find(role => role.name === 'Knuckle Wielder')
    const HBrole = message.guild.roles.cache.find(role => role.name === 'Halberd Wielder')
    const KTNrole = message.guild.roles.cache.find(role => role.name === 'Katana Wielder')
    const OHSrole = message.guild.roles.cache.find(role => role.name === 'One-Handed Sword Wielder')
    const THSrole = message.guild.roles.cache.find(role => role.name === 'Two-Handed Sword Wielder')
    const STAFFrole = message.guild.roles.cache.find(role => role.name === 'Staff Wielder')
    
    const BOWemoji = '<:xnot_toram_wpn_bow:952256066824065105>';
    const CBemoji = '<:xnot_toram_wpn_cb:952256067264454718>';
    const DSemoji = '<:xnot_toram_wpn_ds:952256067654524929>';
    const KNUCKemoji = '<:xnot_toram_wpn_gauntlet:952256067277062164>';
    const HBemoji = '<:xnot_toram_wpn_hb:952256067914567771>';
    const KTNemoji = '<:xnot_toram_wpn_katana:952256067449024552>';
    const OHSemoji = '<:xnot_toram_wpn_ohs:952256067260260402>';
    const THSemoji = '<:xnot_toram_wpn_ths:952256067633561721>';
    const STAFFemoji = '<:xnot_toram_wpn_staff:952256067407052810>';

    let embedRoles = new MessageEmbed()
        .setDescription(`**REACT TO BE KNOWN AS THE WEAPON WIELDER**\n\n${BOWemoji} Bow wielder\n${CBemoji} Bowgun wielder\n${DSemoji} Dual Sword wielder\n${KNUCKemoji} Knuckle wielder\n${HBemoji} Halberd wielder\n${KTNemoji} Katana wielder\n${OHSemoji} One-handed Sword wielder\n${THSemoji} Two-Handed Sword wielder\n${STAFFemoji} Staff wielder`)
        .setColor("4f545c")
        .setThumbnail("https://i.imgur.com/tZCYzce.gif")

    let messageEmbed = await message.channel.send(embedRoles);
    messageEmbed.react(BOWemoji);
    messageEmbed.react(CBemoji);
    messageEmbed.react(DSemoji);
    messageEmbed.react(KNUCKemoji);
    messageEmbed.react(HBemoji);
    messageEmbed.react(KTNemoji);
    messageEmbed.react(OHSemoji);
    messageEmbed.react(THSemoji);
    messageEmbed.react(STAFFemoji);

    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;

        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.name === 'xnot_toram_wpn_bow') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(BOWrole);
            }
            if (reaction.emoji.name === 'xnot_toram_wpn_cb') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(CBrole);
            }
            if (reaction.emoji.name === 'xnot_toram_wpn_ds') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(DSrole);
            }
            if (reaction.emoji.name === 'xnot_toram_wpn_gauntlet') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(KNUCKrole);
            }
            if (reaction.emoji.name === 'xnot_toram_wpn_hb') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(HBrole);
            }
            if (reaction.emoji.name === 'xnot_toram_wpn_katana') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(KTNrole);
            }
            if (reaction.emoji.name === 'xnot_toram_wpn_ohs') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(OHSrole);
            }
            if (reaction.emoji.name === 'xnot_toram_wpn_ths') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(THSrole);
            }
            if (reaction.emoji.name === 'xnot_toram_wpn_staff') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(STAFFrole);
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
            if (reaction.emoji.name === 'xnot_toram_wpn_bow') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(BOWrole);
            }
            if (reaction.emoji.name === 'xnot_toram_wpn_cb') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(CBrole);
            }
            if (reaction.emoji.name === 'xnot_toram_wpn_ds') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(DSrole);
            }
            if (reaction.emoji.name === 'xnot_toram_wpn_gauntlet') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(KNUCKrole);
            }
            if (reaction.emoji.name === 'xnot_toram_wpn_hb') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(HBrole);
            }
            if (reaction.emoji.name === 'xnot_toram_wpn_katana') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(KTNrole);
            }
            if (reaction.emoji.name === 'xnot_toram_wpn_ohs') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(OHSrole);
            }
            if (reaction.emoji.name === 'xnot_toram_wpn_ths') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(THSrole);
            }
            if (reaction.emoji.name === 'xnot_toram_wpn_staff') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(STAFFrole);
            }
        } else {
            return;
        }
    });

    message.delete()
}

module.exports.help = {
    name: 'setroleweapon'
}