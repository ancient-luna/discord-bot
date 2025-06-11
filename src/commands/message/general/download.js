const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const axios = require('axios');

module.exports = new Object({
    name: "download",
    description: "download contents",
    category: "general",
    usage: `download <link>`,
    cooldown: 0,
    aliases: [],
    examples: [],
    sub_commands: [],
    args: false,
    permissions: { client: [], user: [], dev: false, },
    player: { voice: false, active: false, dj: false, },
    /**
     * 
     * @param {import("../../../index")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {
        const link = args[0];
        if (!link) return message.reply("hey! wheres the link?");
        
        const loadingTxt = await message.reply(`<a:u_load:1334900265953923085> getting the content`);

        let platform;
        try {
            const hostname = new URL(link).hostname;

            if (hostname.includes("facebook.com")) platform = "facebook";
            else if (hostname.includes("instagram.com")) platform = "instagram";
            else if (hostname.includes("tiktok.com")) platform = "tiktok";
            else if (hostname.includes("spotify.com")) platform = "spotify";
            else if (hostname.includes("soundcloud.com")) platform = "soundcloud";
            else return loadingTxt.edit("**Unsupported platform.** Currently only support Facebook, Instagram, TikTok, or Spotify links.");
        } catch (e) {
            return loadingTxt.edit("invalid URLs");
        }

        const apiUrl = `https://api.ferdev.my.id/downloader/${platform}?link=${encodeURIComponent(link)}`;
        let res;
        try {
            res = await axios.get(apiUrl, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (compatible)",
                }
            });
        } catch (err) {
            console.error(err);
            return loadingTxt.edit("Uh-oh! Something went wrong while fetching the data.");
        }

        const data = res.data?.data || res.result;
        if (!data) return loadingTxt.edit("Uh-oh! Something went wrong while fetching the data.");

        let videoUrl;
        // let title = data.title || data.metadata.title || data.meta.title || "here the downloaded content";

        switch (platform) {
            case "facebook":
                videoUrl = data.hd || data.sd;
                break;
            case "instagram":
                videoUrl = data.videoUrls?.[0]?.url;
                break;
            case "tiktok":
                videoUrl = data.play;
                break;
            case "spotify":
                videoUrl = res.data.download;
                break;
        }

        if (!videoUrl) return loadingTxt.edit("Failed to find the video URL. Please check the link or try again.");

        loadingTxt.edit({ content: `<:ic_repost:1334863701026541648> [download here](${videoUrl})` })

    }
});