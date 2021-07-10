const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    const channel = await message.guild.channels.create(`ticket-${message.author.username}`).catch((err) => message.channel.send("I do not have permission to create a channel!"))

    channel.setParent("863293585091985410");

    await channel.updateOverwrite(message.author, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,
        EMBED_LINKS: true,
        ATTACH_FILES: true,
        READ_MESSAGE_HISTORY: true,
        USE_EXTERNAL_EMOJIS: true,
        ADD_REACTIONS: false
    });

    const seekerID = await message.guild.roles.cache.get("853585853104390175");

    await channel.updateOverwrite(seekerID, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,
        MANAGE_CHANNELS: true,
        MANAGE_MESSAGES: true,
        EMBED_LINKS: true,
        ATTACH_FILES: true,
        READ_MESSAGE_HISTORY: true,
        USE_EXTERNAL_EMOJIS: true,
        ADD_REACTIONS: true
    });

    await channel.updateOverwrite(message.guild.id, {
        VIEW_CHANNEL: false
    });

    const openTicket = new MessageEmbed()
        .setAuthor(`${message.author.tag}: OPEN A TICKET`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Your application ticket is ready <#${channel.id}>`)
        .setFooter(`this message will be deleted in 30 seconds`)
        .setColor('4f545c')

    let msg = await message.channel.send(openTicket)
        setTimeout(() => {
            msg.delete()
        }, 30000)

    await message.delete();

    const mEmbed = new MessageEmbed()
        .setAuthor(`${message.author.tag}: APPLICATION TICKET`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Thank you for your application. The Ancestor will be here as soon as possible! If he still alive out there. Please take your time while waiting`)
        .setFooter(`note: Don't hesitate to mention him if need now `)
        .setColor("4f545c")

    await channel.send(mEmbed)
}
  
module.exports.help = {
    name: 'applyticket'
}