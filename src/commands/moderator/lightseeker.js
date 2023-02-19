const { MessageActionRow, MessageButton } = require("discord.js");

module.exports.run = async (Client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    let target = message.mentions.members.first();

    if (!target) return message.reply('please mention a user').catch((e) => {});

    let role = '839198215580811344';

    await message.delete().catch((e) => {});

    const welcomeButton = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle("LINK")
                .setLabel("Get more roles here")
                .setURL("https://discord.com/channels/447069790150852609/864556584818835456")
    )

    message.guild.channels.cache.get('452842830776369152').send({
        content: `<@${target.user.id}> has passed the trial by understand our wisdom of lleud to reach this warm sanctuary deeper.\nWelcome, to the sanctuary of lights. The <@&843523544620335124> welcome you as one of true light seekers <:ancientluna_pure_luna:866781517312688178>`,
        components: [welcomeButton]
    }).then(target.roles.add(role)).catch((e) => {});
    
}

module.exports.help = {
    name: 'lightseeker'
}