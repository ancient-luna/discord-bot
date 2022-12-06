const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    const messageID = args[0];
    const editQuery = args.slice(1).join(" ");

    if(!messageID) return message.reply("`messageid` `reason`").catch((e) => {});
    if(!editQuery) return message.reply("`messageid` `reason`").catch((e) => {});

    const ToramOnlineEmoji = '<:game_logo_toram:952247863075823666>';
    const BlackDesertOnlineEmoji = '<:game_logo_bdo:861579805660151818>';
    const ApexLegendsEmoji = '<:game_logo_apex:861580082418417664>';
    const DeadFrontierEmoji = '<:game_logo_df:861580085000798229>';
    const GiveawayEmoji = '<:ancientluna_divinare_s:859034096192978965>';
    const MooncraftEmoji = '<:game_logo_mc:981470249792712774>';
    const ValorEmoji = '<:game_logo_valor:981481044874252338>';
    const ServerBoostEmoji = '<:ancientluna_divinare:841754250949820416>';
    const AdAstraAbyssosqueEmoji = '<:vcon_warning:992917967660654663>';

    try {
        const guideChannel = message.guild.channels.cache.get(
            "864556584818835456"
        );

        const guideEmbed = await guideChannel.messages.fetch(messageID);
        const data = guideEmbed.embeds[0];
        const editEmbed = new MessageEmbed()
            .setDescription(editQuery)
            .setColor(`#2f3136`)
        
        message.channel.send("Guidelines: **EDITED** ! `updated`").catch((e) => {});
        let reactedEmbed = await guideEmbed.edit({ embeds: [editEmbed] }).catch((e) => {});
        reactedEmbed.react(ToramOnlineEmoji).catch((e) => {});
        reactedEmbed.react(BlackDesertOnlineEmoji).catch((e) => {});
        reactedEmbed.react(ApexLegendsEmoji).catch((e) => {});
        reactedEmbed.react(DeadFrontierEmoji).catch((e) => {});
        reactedEmbed.react(GiveawayEmoji).catch((e) => {});
        reactedEmbed.react(MooncraftEmoji).catch((e) => {});
        reactedEmbed.react(AdAstraAbyssosqueEmoji).catch((e) => {});
        reactedEmbed.react(ValorEmoji).catch((e) => {});
        reactedEmbed.react(ServerBoostEmoji).catch((e) => {});

    } catch (err) {
        console.log(err);
        message.channel.send(`That guideline id chat doesn't exist.`).catch((e) => {});
    }
}

module.exports.help = {
    name: 'editguide'
}