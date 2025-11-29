const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require("discord.js");
const axios = require("axios");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("link")
        .setDescription("Show content from FB/IG/TikTok/Spotify links")
        .addStringOption(option =>
            option.setName("url")
                .setDescription("The URL of the content to show")
                .setRequired(true)
        ),
    cooldown: 5, // in seconds

    async execute(client, interaction) {
        const link = interaction.options.getString("url");

        let platform;
        try {
            const hostname = new URL(link).hostname;

            if (hostname?.includes("facebook.com")) platform = "facebook";
            else if (hostname?.includes("instagram.com")) platform = "instagram";
            else if (hostname?.includes("tiktok.com")) platform = "tiktok";
            else if (hostname?.includes("spotify.com")) platform = "spotify";
            else
                return interaction.reply({ content: "**Unsupported platform.**\n-# Currently only support Facebook, Instagram, TikTok, or Spotify links.", flags: MessageFlags.Ephemeral });
        } catch (e) {
            return interaction.reply({ content: "Invalid URL provided.", flags: MessageFlags.Ephemeral });
        }

        const downloadApiUrl = `https://api.ferdev.my.id/downloader/${platform}?link=${encodeURIComponent(
            link
        )}&apikey=${process.env.RES_API}`;
        
        let res;
        try {
            res = await axios.get(downloadApiUrl, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (compatible)",
                },
            });
        } catch (err) {
            return interaction.reply({ content: `Uh-oh! Something went wrong while fetching the data **[${err.response?.status || 'Unknown'}]**`, flags: MessageFlags.Ephemeral });
        }

        const data = res.data?.data || res.result;
        if (!data) return interaction.reply({ content: `Uh-oh! Something went wrong while fetching the data`, flags: MessageFlags.Ephemeral });

        let contentURLs;

        switch (platform) {
            case "facebook":
                contentURLs = data.hd || data.sd;
                break;
            case "instagram":
                contentURLs = data.videoUrls?.[0]?.url;
                break;
            case "tiktok":
                contentURLs = data.play;
                break;
            case "spotify":
                contentURLs = res.data.download;
                break;
        }

        if (!contentURLs) return interaction.reply({ content: `Failed to find the video URL. **Please check the link or try again.**`, flags: MessageFlags.Ephemeral });

        let shortenedUrl = contentURLs;
        // URL shortening logic was commented out in the original file, so keeping it that way.

        await interaction.reply({
            content: `<:ic_repost:1334863701026541648> [media](${shortenedUrl})`,
        });
    },
};
