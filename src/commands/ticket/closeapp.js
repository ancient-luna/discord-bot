module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;
    await message.delete().catch((e) => {});
    if (!message.channel.name.includes('ticket')) return message.reply('You are not allowed to delete a normal channel').catch((e) => {});
    message.channel.send("Closing ticket in 5 seconds <a:_util_loading:863317596551118858>").catch((e) => {});
    setTimeout(() => {
        message.channel.delete().catch((e) => {});
    }, 5000)
}

module.exports.help = {
    name: 'closeticket'
}