const { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    const ToramOnlineEmoji = '<:game_logo_toram:952247863075823666>';
    const BlackDesertOnlineEmoji = '<:game_logo_bdo:861579805660151818>';
    const ApexLegendsEmoji = '<:game_logo_apex:861580082418417664>';
    const DeadFrontierEmoji = '<:game_logo_df:861580085000798229>';
    const GiveawayEmoji = '<:ancientluna_divinare_s:859034096192978965>';
    const MooncraftEmoji = '<:game_logo_mc:981470249792712774>';
    const ValorEmoji = '<:game_logo_valor:981481044874252338>';
    const AdAstraAbyssosqueEmoji = '<:vcon_warning:992917967660654663>';
    const ServerBoostEmoji = '<:ancientluna_divinare:841754250949820416>';

    const IMGguide = new MessageAttachment("src/assets/guidelines.png")
    const IMGticket = new MessageAttachment("src/assets/ticketopen.png")
    const IMGroles = new MessageAttachment("src/assets/roleserver.png")

    let embedGuide = new MessageEmbed()
        .setTitle("Feedback / Suggestion")
        .setDescription(`Type !suggest followed by your feedbacks, thoughts, or suggestions⁣\nExample !suggest ancestor need to awake 24/7\n\n*!suggest your_suggestion*`)
        .setColor("#2f3136")

    let embedTicket = new MessageEmbed()
        .setDescription(`Type the command **!applyticket** and a room ticket will open for you`)
        .setColor("#2f3136")

    let embedRoles = new MessageEmbed()
        .setDescription(`You can apply to get this role by open a ticket for application:\n\n⁣The <@&907178060992876544> role only given to guild members in Toram Online game,\nwhile <@&873872221368647690> role given to guild alliances members\n\nReact to any reaction that suits you for the game you love:\n\n${ToramOnlineEmoji} <@&952147085447266364> for Toram Online\n⁣${BlackDesertOnlineEmoji} <@&856380073745186876> for Black Desert Online\n\n${ApexLegendsEmoji} <@&861400119101095937> for Apex Legends\n${DeadFrontierEmoji} <@&874680389459906580> for Dead Frontier\n${ValorEmoji} <@&981479474531024958> for Valorant\n\n${MooncraftEmoji} <@&981470521470382090> for Minecraft\n\n${AdAstraAbyssosqueEmoji} <@&882350441864777769> for unlocking nsfw contents\n\nBy this you will unlock the hidden category in this server to meet another light seekers in this sanctuary`)
        .setColor("#2f3136")

    await message.channel.send({ files: [IMGguide], embeds: [embedGuide] })
    await message.channel.send({ files: [IMGticket], embeds: [embedTicket] })
    
    let messageEmbed = await message.channel.send({ files: [IMGroles], embeds: [embedRoles] })
    messageEmbed.react(ToramOnlineEmoji)
    messageEmbed.react(BlackDesertOnlineEmoji)
    messageEmbed.react(ApexLegendsEmoji)
    messageEmbed.react(DeadFrontierEmoji)
    messageEmbed.react(GiveawayEmoji)
    messageEmbed.react(MooncraftEmoji)
    messageEmbed.react(ValorEmoji)
    messageEmbed.react(AdAstraAbyssosqueEmoji)
    messageEmbed.react(ServerBoostEmoji)
}

module.exports.help = {
    name: 'setguide'
}