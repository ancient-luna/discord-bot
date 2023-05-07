const { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton } = require("discord.js");
const Sentry = require('@sentry/node');
const fetch = require('node-fetch');
const gamedig = require('gamedig');

module.exports.run = async (Client, message, args) => {
    const ip = "139.99.24.66:25565";

    const images = [
        'https://i.imgur.com/8fuPt3d.gif',
        'https://i.imgur.com/2Lb34dV.gif',
        'https://i.imgur.com/ylTQ9DP.gif',
        'https://i.imgur.com/4eryrDT.gif',
        'https://i.imgur.com/C7MV8dH.gif',
        'https://i.imgur.com/pulSvVP.gif',
        'https://i.imgur.com/LI4ZkxZ.gif',
        'https://i.imgur.com/bQjsNym.gif'
    ];

    let options = {
        type: 'minecraft',
        host: ip,
    };

    if (ip.split(':').length > 1) {
        options = {
            type: 'minecraft',
            host: ip.split(':')[0],
            port: ip.split(':')[1],
        };
    }

    const MCMessage = await message.reply('Loading terrain <a:_util_loading:863317596551118858>');

    let json = null;

    try {
        json = await gamedig.query(options);
    } catch (error) {
        await Sentry.captureException(error);
    }

    if (!json) {
        options.type = 'minecraftpe';
        try {
            json = await gamedig.query(options);
        } catch (error) {
            await Sentry.captureException(error);
        }
    }

    if (!json) {
        const ErrorEmbed = new MessageEmbed()
            .setTitle('Server is unavailable')
            .setDescription('This server either doesn\'t exist, is offline or blocking access!')
            .setColor('2b2d31')
            .setFooter({ text: 'Join discord server to know on what is happening', iconURL: 'https://i.imgur.com/7JDP7JR.png' });
        let serverErrButton = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Discord Server')
                    .setURL('https://discord.com/invite/Sbp2nt8QHe')
            )
        return MCMessage.edit({
            content: '⁣',
            embeds: [ErrorEmbed],
            components: [serverErrButton]
        });
    }

    const ImageResponse = await fetch(`https://minecraftskinstealer.com/achievement/1/mc.ancientluna.org/vanilla | survival`);
    const ImageAttachment = new MessageAttachment(await ImageResponse.buffer(), 'ancientlunacraft.png');

    const MinecraftEmbed = new MessageEmbed()
        .setTitle(`Ancient Luna Craft`)
        .addFields(
            { name: `Version`, value: `**\`${json.raw.vanilla.raw.version.name}\`**`, inline: true },
            { name: `Players Online`, value: `**\`${(json.raw.players ? json.raw.players.online : json.players.length)}/${(json.raw.players ? json.raw.players.max : json.maxplayers)}\`**`, inline: true },
            { name: `Status`, value: '**`🟢 Online`**', inline: true }
        )
        .setDescription(`A friendly sanctuary of Minecraft Java and Bedrock players that want to create an amazing community for everyone to join. There’s a **[Discord Server](https://discord.com/invite/Sbp2nt8QHe)** where you mayplay games and speak with others, along with make new friends!`)
        .setImage(images[Math.floor(Math.random() * images.length)])
        .setColor('2b2d31')
        .setFooter({ text: `ip: mc.ancientluna.org • port: 25565` });
    
    let serverButton = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('Discord Server')
                .setURL('https://discord.com/invite/Sbp2nt8QHe')
        )

    MCMessage.edit({
        content: '⁣',
        files: [ImageAttachment],
        embeds: [MinecraftEmbed],
        components: [serverButton]
    });
}

module.exports.help = {
    name: 'mcserver'
}   