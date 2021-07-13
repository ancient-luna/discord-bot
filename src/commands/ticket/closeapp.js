module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;
    await message.delete();
    if (!message.channel.name.includes('ticket')) return message.reply('You are not allowed to delete a normal channel')
    message.channel.send("Closing ticket in 5 seconds <a:_util_loading:863317596551118858>")
    setTimeout(() => {
        message.channel.delete()
    }, 5000)
}
module.exports.help = {
    name: 'closeticket'
}