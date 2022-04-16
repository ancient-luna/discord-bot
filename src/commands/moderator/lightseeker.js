module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    let target = message.mentions.members.first();

    if (!target) return message.reply('please mention a user')

    let role = message.mentions.roles.first();

    if (!role) return message.reply('please mention a role after user')

    message.guild.channels.cache.get('452842830776369152').send(`<@${target.user.id}> has passed the trial by understand our wisdom of lleud to reach this warm sanctuary deeper.\nWelcome, to the sanctuary of lights. The <@&843523544620335124> welcome you as one of true **light seekers**. <:ancientluna_pure_luna:866781517312688178>`).then(target.roles.add(role));
    
    await message.delete().catch((e) => {});
}

module.exports.help = {
    name: 'lightseeker'
}