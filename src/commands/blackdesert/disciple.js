const { MessageEmbed } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    let target = message.mentions.members.first();

    if (!target) return message.reply('please mention a user').catch(e => {});

    let role = message.mentions.roles.first();

    if (!role) return message.reply('please mention a role after user').catch(e => {});

    message.guild.channels.cache.get('1060992670035619931').send(`A seeker named <@${target.user.id}> become a part of <@&1060982357538119850> [<:ancientluna_pure_luna:866781517312688178>]`).then(target.roles.add(role)).catch(e => {});
    
    await message.delete().catch((e) => {});

    const addEOS = new MessageEmbed()
        .setAuthor({ name: "ROLE ADDED", iconURL: "https://i.imgur.com/ejkkWCB.png" })
        .setDescription("You have been gived **Lunar Disciples** role and have access to all channels as an official guild member in **[Ecplise Boarder Hall](https://discord.com/channels/447069790150852609/1060992670035619931)** category. May the lights guide us, so we may bask in its light as a true ancient civilizations")
        .setTimestamp()
        .setColor("2f3136")
        .setFooter({ text: "Ancient Luna Guild: We ran as if to meet the moon" })
        
    await target.user.send({ embeds: [addEOS] }).catch(e => {});
}

module.exports.help = {
    name: 'disciple'
}