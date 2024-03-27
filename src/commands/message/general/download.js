const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const axios = require("axios");
module.exports = new Object({
    name: "download",
    description: "download.",
    category: "Entertainment",
    usage: "",
    cooldown: 0,
    aliases: [''],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
        user: [],
        dev: false,
    },
    player: { voice: false, active: false, dj: false, },
    /**
     * 
     * @param {import("../../../index")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {
        
        const vidID = args[0];
        if (!vidID) return message.reply("By the moonlight, insert the youtube video ID\n**example** `https://www.youtube.com/watch?v=wq0DURi1ekY` **put the** `v=wq0DURi1ekY` **after command**");
        let loading = await message.reply(`Getting the file ready <a:_util_loading:863317596551118858>`);

        const inputMP3 = {
            method: 'GET',
            url: 'https://youtube-mp3-download1.p.rapidapi.com/dl',
            params: {id: vidID},
            headers: {
                'X-RapidAPI-Key': process.env.X_RAPID_API,
                'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com'
            }
        }

        const inputMP4 = {
            method: 'GET',
            url: 'https://youtube-video-download-info.p.rapidapi.com/dl',
            params: {id: vidID},
            headers: {
                'X-RapidAPI-Key': process.env.X_RAPID_API,
                'X-RapidAPI-Host': 'youtube-video-download-info.p.rapidapi.com'
            }
        }

        try {
            const responseMP3 = await axios.request(inputMP3);

            const output = await axios.request(inputMP4)
            const responseMP4 = output.data.link[22]; 

            const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('Download MP3')
                .setStyle(ButtonStyle.Link)
                .setURL(responseMP3.data.link)
            )
            .addComponents(
                new ButtonBuilder()
                .setLabel('Download MP4')
                .setStyle(ButtonStyle.Link)
                .setURL(responseMP4[0])
            )

            const embed = new EmbedBuilder()
                .setColor(client.config.embedColorTrans)
                .setDescription(`Click on button below to download the converted **${output.data.title}** video`)

            await loading.edit({
                content: '⁣',
                embeds: [embed],
                components:[button]
            })
        } catch (e) {
            console.log (e);
            await loading.edit({ content: `The video ID does not exist!\n** Go to YouTube link, and copy the ID after the = or the /**` });
        }
    }
})