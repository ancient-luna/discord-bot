module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;
    await message.delete().catch((e) => {});

    message.guild.channels.cache.get('997467514818797649').send(`*Someone has failed to take the test as themself was not ready ...*`).catch(e => {});

    if (!message.channel.name.includes('sorting')) return message.reply(`*My authorithy as The Sorting Hat's right hand can't do further to doubt and delete this channel of mind*`).catch((e) => {});
    message.channel.send({ content: "*Doubting you.... It's really hard to chose 'cause you weren't ready. I'll see you once you're ready later ...*" }).catch((e) => {});
    setTimeout(() => {
        message.channel.delete().catch((e) => {});
    }, 5000)
}

module.exports.help = {
    name: 'doubt'
}