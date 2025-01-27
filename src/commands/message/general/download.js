const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'download',
    description: 'convert YouTube to MP3 and MP4 to download',
    category: 'general',
    usage: '',
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
    player: {
        voice: false,
        active: false,
        dj: false,
    },
    /**
     * 
     * @param {import("../../../index")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {
        const url = args[0];
        if (!url) return message.reply("Please provide a `URL` to download");
        let loading = await message.reply(`Getting the file ready <a:_util_loading:863317596551118858>`);

        const supportedUrls = ['instagram.com', 'tiktok.com', 'youtube.com', 'youtu.be', 'facebook.com', 'fb.watch', 'reel', 'x.com', 'twitter.com'];
        const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;

        if (!supportedUrls.some(supportedUrl => url.includes(supportedUrl)) && !youtubeRegex.test(url)) {
            return loading.edit('Unsupported URL! Supported platforms are Facebook, Instagram, TikTok, YouTube.');
        }

        const apiUrls = {
            ig: `https://api.nyxs.pw/dl/ig?url=${encodeURIComponent(url)}`,
            tt: `https://api.nyxs.pw/dl/tiktok?url=${encodeURIComponent(url)}`,
            yt: `https://api.nyxs.pw/dl/yt?url=${encodeURIComponent(url)}`,
            fb: `https://api.nyxs.pw/dl/fb?url=${encodeURIComponent(url)}`,
            tx: `https://api.nyxs.pw/dl/twitter?url=${encodeURIComponent(url)}`,
        };

        let response, data;
        let downloadLinks = '';
        let platform = '';

        try {
            if (url.includes('instagram.com')) {
                platform = 'Instagram';
                response = await axios.get(apiUrls.ig);
                data = response.data;
                if (data.result && Array.isArray(data.result)) {
                    data.result.forEach((item, index) => {
                        downloadLinks += `[Download File ${index + 1}](${item.url})\n`;
                    });
                } else {
                    throw new Error('Invalid response from Instagram API');
                }
            } else if (url.includes('tiktok.com')) {
                platform = 'TikTok';
                response = await axios.get(apiUrls.tt);
                data = response.data;
                if (data.result) {
                    if (data.result.type === 'image') {
                        data.result.images.forEach((imageUrl, index) => {
                            downloadLinks += `[Download Image ${index + 1}](${imageUrl})\n`;
                        });
                        downloadLinks += `[Download Music Audio](${data.result.music})\n`;
                    } else {
                        downloadLinks += `[Download Video](${data.result.video1})\n[Download HD Video](${data.result.video_hd})\n[Download Watermark Video](${data.result.video_watermark})\n[Download Music Audio](${data.result.music})`;
                    }
                } else {
                    throw new Error('Invalid response from TikTok API');
                }
            }  else if (youtubeRegex.test(url)) {
                platform = 'YouTube';
                const vidUrl = url.match(youtubeRegex)[5];
                const inputMP3 = {
                    method: 'GET',
                    url: 'https://youtube-mp3-download1.p.rapidapi.com/dl',
                    params: { id: vidUrl },
                    headers: {
                        'X-RapidAPI-Key': process.env.X_RAPID_API,
                        'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com'
                    }
                }
                const inputMP4 = {
                    method: 'GET',
                    url: 'https://yt-api.p.rapidapi.com/dl',
                    params: { id: vidUrl },
                    headers: {
                        'X-RapidAPI-Key': process.env.X_RAPID_API,
                        'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
                    }
                }
                try {
                    const responseMP3 = await axios.request(inputMP3);
                    const output = await axios.request(inputMP4);
                    const formats = output.data.adaptiveFormats;
                    downloadLinks = `**${output.data.title}**\n\n`;
                    downloadLinks += `[Download MP3](${responseMP3.data.link})\n`;

                    formats.slice(0, 1).forEach((format, index) => {
                        downloadLinks += `[Download Video (${format.qualityLabel}p)](${format.url})\n`;
                    });
                } catch (e) {
                    console.log(e);
                    await loading.edit({ content: `The video ID does not exist!\n** Go to YouTube link, and copy the ID after the = or the /**` });
                }
            } else if (/(reel|fb|facebook\.com|fb\.watch)/i.test(url)) {
                platform = 'FaceBook';
                response = await axios.get(apiUrls.fb);
                data = response.data;
                if (data.result) {
                    const { hd, sd } = data.result;

                    if (hd) {
                        downloadLinks += `[Download Video HD](${hd})\n`;
                    }
                    if (sd) {
                        downloadLinks += `[Download Video SD](${sd})\n`;
                    }
                } else {
                    throw new Error('Invalid response from FaceBook API');
                }
            } else if (/(x\.com|twitter\.com)/i.test(url)) {
                platform = 'X';
                response = await axios.get(apiUrls.tx);
                data = response.data;
                if (data.result) {
                    const { media } = data.result;
                    if (media && media.length > 0) {
                        const video = media.find(m => m.type === 'video');
                        if (video && video.videos && video.videos.length > 0) {
                            video.videos.forEach((vid, index) => {
                                downloadLinks += `[Download Video ${vid.quality}](${vid.url})\n`;
                            });
                        } else {
                            throw new Error('No videos found in the response from X API');
                        }
                    } else {
                        throw new Error('No media found in the response from X API');
                    }
                } else {
                    throw new Error('Invalid response from X API');
                }
            } else {
                throw new Error('Unsupported URL!');
            }

            const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('See original content')
                        .setStyle(ButtonStyle.Link)
                        .setURL(url)
                );

            const embedDownload = new EmbedBuilder()
                .setColor(client.config.embedColorTrans)
                .setDescription(downloadLinks)
                .setFooter({ text:`${platform} download link request (u) ${message.author.username}` })
                .setTimestamp();

            await loading.edit({
                content: '⁣',
                embeds: [embedDownload],
                components: [button]
            });
        } catch (error) {
            console.error(error);
            await loading.edit('An error occurred while processing your request.\n**Please make sure** `the link is not private`');
        }
    }
};