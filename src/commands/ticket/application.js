const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    const channel = await message.guild.channels.create(`ticket-${message.author.username}`).catch((err) => message.channel.send("I do not have permission to create a channel!"))

    channel.setParent("863293585091985410");

    const seekerID = await message.guild.roles.cache.get("853585853104390175");

    channel.updateOverwrite(seekerID, {
        ADMINISTRATOR: true
    });

    channel.updateOverwrite(message.guild.id, {
        VIEW_CHANNEL: false
    });

    channel.updateOverwrite(message.author, {
        SEND_MESSAGES: true,
        SEND_TTS_MESSAGES: true,
        VIEW_CHANNEL: true,
        EMBED_LINKS: true,
        ATTACH_FILES: true,
        READ_MESSAGE_HISTORY: true,
        USE_EXTERNAL_EMOJIS: true,
        ADD_REACTIONS: false
    });
    
    const openTicket = new MessageEmbed()
        .setAuthor(`${message.author.tag}: A TICKET OPENED`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Click <#${channel.id}> to see your application ticket`)
        .setFooter(`this notification message will be deleted in 30 seconds`, `https://i.imgur.com/26tcTpL.gif`)
        .setColor('4f545c')

    message.channel.send(openTicket).then((msg) => {
        setTimeout(() => msg.delete(), 30000);
        setTimeout(() => message.delete());
    }).catch((err) => {
        throw err;
    })

    const mEmbed = new MessageEmbed()
        .setAuthor(`${message.author.tag}: APPLICATION TICKET`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Thank you for your application. The Ancestor will be here as soon as possible! If he still alive out there. Please take your time while waiting`)
        .setFooter(`note: Don't hesitate to mention him if need now `)
        .setColor("4f545c")
    
    const m = await channel.send(mEmbed)
    
    try {
        await m.react("🔐");
        await m.react("🗂️");
        await m.react("📛");
    } catch (err) {
        channel.send("Error sending emojis");
        throw err;
    }
    
    const collector = m.createReactionCollector(
        (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("MANAGE_MESSAGES"),
        { dispose:true }
    );

    collector.on('collect', (reaction, user) => {
        switch (reaction.emoji.name){
            case "🔐":
                channel.updateOverwrite(message.author, { SEND_MESSAGES: false });
                break;
            case "🗂️":
                channel.updateOverwrite(message.author, { VIEW_CHANNEL: false });
                break;
            case "📛":
                channel.send('Closing ticket in 5 seconds <a:_util_loading:863317596551118858>');
                setTimeout(() => channel.delete(), 5000);
                break;
        }
    });

}
  
module.exports.help = {
    name: 'applyticket'
}