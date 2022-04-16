const { MessageEmbed, ReactionManager } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    const channel = '871056365651652650';
    const OARole = message.guild.roles.cache.find(role => role.name === 'Bes')
    const MissionRole = message.guild.roles.cache.find(role => role.name === 'Manes')
    const BanditRole = message.guild.roles.cache.find(role => role.name === 'Hades')
    const DHRole = message.guild.roles.cache.find(role => role.name === 'Veles')
    const VLRole = message.guild.roles.cache.find(role => role.name === 'Lemures')

    const OAEmoji = '<:a_df_alert_oa:882951834036240405>';
    const MissionEmoji = '<:a_df_dirty_note:879663755611492352>';
    const BanditEmoji = '<:a_df_whiteghost:879646225442439198>';
    const DHEmoji = '<:a_df_item_devilhound:882951299572854934>';
    const VLEmoji = '<:a_df_item_volatilehide:882951769993404416>';

    let embedRoles = new MessageEmbed()
        .setDescription(`**REACT TO GET ALERT NOTIFICATION** <:game_logo_df:861580085000798229> **(DEAD FRONTIER)**\n\n${OAEmoji} <@&871062770387390505> for Outpost Attacks\n⁣⁣${MissionEmoji} <@&871061864459694101> for Missions\n${BanditEmoji} <@&871065063820234812> for Bandits\n${DHEmoji} <@&871061650868961310> for Devil Hounds\n${VLEmoji} <@&871062384557568030> for Volatile Leapers`)
        .setColor("4f545c")
        .setImage("https://i.imgur.com/8TdP6Kl.gif")

    let messageEmbed = await message.channel.send({ embeds: [embedRoles]});
    messageEmbed.react(OAEmoji);
    messageEmbed.react(MissionEmoji);
    messageEmbed.react(BanditEmoji);
    messageEmbed.react(DHEmoji);
    messageEmbed.react(VLEmoji);

    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;

        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.name === 'a_df_alert_oa') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(OARole);
                const addOAmsg = new MessageEmbed()
                    .setDescription(`${reaction.message.guild.members.cache.get(user.id)}, role **<@&871062770387390505>** added as reminder in <#871057065383174184>`)
                    .setColor("4f545c")
                message.channel.send({ embeds: [addOAmsg] }).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'a_df_dirty_note') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(MissionRole);
                const addMISSIONmsg = new MessageEmbed()
                    .setDescription(`${reaction.message.guild.members.cache.get(user.id)}, role **<@&871061864459694101>** added as reminder in <#871057489179840572>`)
                    .setColor("4f545c")
                message.channel.send({ embeds: [addMISSIONmsg] }).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'a_df_whiteghost') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(BanditRole);
                const addBANDITmsg = new MessageEmbed()
                    .setDescription(`${reaction.message.guild.members.cache.get(user.id)}, role **<@&871065063820234812>** added as reminder in <#871056816153452594>`)
                    .setColor("4f545c")
                message.channel.send({ embeds: [addBANDITmsg] }).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'a_df_item_devilhound') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(DHRole);
                const addDHmsg = new MessageEmbed()
                    .setDescription(`${reaction.message.guild.members.cache.get(user.id)}, role **<@&871061650868961310>** added as reminder in <#871056843823280158>`)
                    .setColor("4f545c")
                message.channel.send({ embeds: [addDHmsg] }).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'a_df_item_volatilehide') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(VLRole);
                const addVLmsg = new MessageEmbed()
                    .setDescription(`${reaction.message.guild.members.cache.get(user.id)}, role **<@&871062384557568030>** added as reminder in <#871056843823280158>`)
                    .setColor("4f545c")
                message.channel.send({ embeds: [addVLmsg] }).then((msg) => {
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
            if (reaction.emoji.name === 'a_df_alert_oa') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(OARole);
                const addOAmsg = new MessageEmbed()
                    .setDescription(`${reaction.message.guild.members.cache.get(user.id)}, role **<@&871062770387390505>** removed`)
                    .setColor("RED")
                message.channel.send({ embeds: [addOAmsg] }).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'a_df_dirty_note') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(MissionRole);
                const addMISSIONmsg = new MessageEmbed()
                    .setDescription(`${reaction.message.guild.members.cache.get(user.id)}, role **<@&871061864459694101>** removed`)
                    .setColor("RED")
                message.channel.send({ embeds: [addMISSIONmsg] }).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'a_df_whiteghost') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(BanditRole);
                const addBANDITmsg = new MessageEmbed()
                    .setDescription(`${reaction.message.guild.members.cache.get(user.id)}, role **<@&871065063820234812>** removed`)
                    .setColor("RED")
                message.channel.send({ embeds: [addBANDITmsg] }).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'a_df_item_devilhound') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(DHRole);
                const addDHmsg = new MessageEmbed()
                    .setDescription(`${reaction.message.guild.members.cache.get(user.id)}, role **<@&871061650868961310>** removed`)
                    .setColor("RED")
                message.channel.send({ embeds: [addDHmsg] }).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
            if (reaction.emoji.name === 'a_df_item_volatilehide') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(VLRole);
                const addVLmsg = new MessageEmbed()
                    .setDescription(`${reaction.message.guild.members.cache.get(user.id)}, role **<@&871062384557568030>** removed`)
                    .setColor("RED")
                message.channel.send({ embeds: [addVLmsg] }).then((msg) => {
                    setTimeout(() => { msg.delete() }, 5000)
                });
            }
        } else {
            return;
        }
    });

    await message.delete().catch((e) => {});
}

module.exports.help = {
    name: 'reminder'
}