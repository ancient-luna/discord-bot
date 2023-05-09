const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    let target = message.mentions.members.first();

    if (!target) return message.reply('Please mention them, the one who is about to be the Lunar Disciple').catch(e => {});

    let role = '1060982357538119850';

    const addLDrule = new MessageEmbed()
        .setAuthor({ name: "Ancient Luna Guild Terms", iconURL: "https://i.imgur.com/SOCuup9.png" })
        .setDescription("Welcome to the sanctuary of lights\nA home for the light seekers!")
        .addFields(
            { name: `**Street Fight / PVP**`, value: `<:_1:1075437107704778943> Killing is OK __**only** in arsha__ ||😦 wanted free kill but- but..||\n<:_2:1075437110183604355> Avoid bad manner and dont ever trash talking in any servers\n<:_3:1075437114721837157> For spots \`normal server\` can kill **but** ask for DFS first \`arsha server\` free kill`, inline: false },
            { name: `**Guild Quests**`, value: `<:_1:1075437107704778943> Guild Quests only can be taken for (Large) size only\n<:_2:1075437110183604355> SMH and Combat GQs can be taken around time 00.00 - 00.00 GMT+8\n<:_3:1075437114721837157> Life GQs can be taken around time 19.00 - 00.00 GMT+8`, inline: false },
            { name: `**Vacation / Day-Off**`, value: `If you are unable to login for 7 days straight it is  a must to let know so we may not kick you out from the guild.\n\n> Do \`!absence days reason\` in <#1060992670035619931>\n> ex: !absence 14 im going to buy milk`, inline: false }
        )
        .setColor("2b2d31")
        .setTimestamp()
        .setFooter({ text: "Ancient Luna Guild: We ran as if to meet the moon" })

    const btnGuild = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle("LINK")
                .setLabel(`Guild Forum`)
                .setURL(`https://ancientluna.org/bdo`)
        )
        .addComponents(
            new MessageButton()
                .setStyle("LINK")
                .setLabel(`Guild Video`)
                .setURL(`https://youtu.be/3S8HVfHYJ5k`)
        )
        .addComponents(
            new MessageButton()
                .setStyle("LINK")
                .setLabel(`Guild Payout Sheet`)
                .setURL(`https://bdo.ancientluna.org/quest`)
        )

    message.guild.channels.cache.get('1060992670035619931').send({
        content: `A seeker named <@${target.user.id}> become a part of <@&1060982357538119850>`,
        embeds: [addLDrule],
        components: [btnGuild]
    }).then(target.roles.add(role)).catch(e => {});
    
    await message.delete().catch((e) => {});

    const addLD = new MessageEmbed()
        .setAuthor({ name: "ROLE ADDED", iconURL: "https://i.imgur.com/ejkkWCB.png" })
        .setDescription("You have been gived **Lunar Disciples** role and have access to all channels as an official guild member in **[Ecplise Boarder Hall](https://discord.com/channels/447069790150852609/1060992670035619931)** category. May the lights guide us, so we may bask in its light as a true ancient civilizations")
        .setTimestamp()
        .setColor("2b2d31")
        .setImage("https://i.imgur.com/cNGckVu.png")
        .setFooter({ text: "Ancient Luna Guild: We ran as if to meet the moon" })

    const btnAccess = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle("LINK")
                .setLabel(`Go to Sanctum (Guild Member Only Access)`)
                .setURL(`https://discord.com/channels/447069790150852609/1060992670035619931`)
        )
        
    await target.user.send({
        embeds: [addLD],
        components: [btnAccess]
    }).catch(e => {});
}

module.exports.help = {
    name: 'disciple'
}