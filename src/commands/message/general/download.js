const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require("discord.js");
const axios = require("axios");
require("dotenv").config();

module.exports = new Object({
  name: "download",
  description: "download contents from FB/IG/TikTok/Spotify links",
  category: "general",
  usage: `download <link>`,
  cooldown: 0,
  aliases: [],
  examples: [],
  sub_commands: [],
  args: false,
  permissions: { client: [], user: [], dev: false },
  player: { voice: false, active: false, dj: false },
  /**
   *
   * @param {import("../../../index")} client
   * @param {import("discord.js").Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const link = args[0];
    if (!link) return message.reply("hey! wheres the link?");

    const loadingTxt = await message.reply(
      `<a:u_load:1334900265953923085> getting the content`
    );

    let platform;
    try {
      const hostname = new URL(link).hostname;

      if (hostname.includes("facebook.com")) platform = "facebook";
      else if (hostname.includes("instagram.com")) platform = "instagram";
      else if (hostname.includes("tiktok.com")) platform = "tiktok";
      else if (hostname.includes("spotify.com")) platform = "spotify";
      else
        return loadingTxt.edit(
          "**Unsupported platform.** Currently only support Facebook, Instagram, TikTok, or Spotify links."
        );
    } catch (e) {
      return loadingTxt.edit("invalid URLs");
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
      return loadingTxt.edit(`Uh-oh! Something went wrong while fetching the data **[${err.response.status}]**`);
    }

    const data = res.data?.data || res.result;
    if (!data) return loadingTxt.edit(`Uh-oh! Something went wrong while fetching the data`);

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

    if (!contentURLs) return loadingTxt.edit(`Failed to find the video URL. **Please check the link or try again.**`);

    let shortenedUrl = contentURLs;
    try {
      const shortlinkApiUrl = `https://api.ferdev.my.id/tools/shortlink?link=${encodeURIComponent(contentURLs)}&apikey=${process.env.RES_API}`;
      const shortRes = await axios.get(shortlinkApiUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible)" }
      });

      // Try different possible response structures
      if (shortRes.data?.data?.shortlink) {
        shortenedUrl = shortRes.data.data.shortlink;
      } else if (shortRes.data?.shortlink) {
        shortenedUrl = shortRes.data.shortlink;
      } else if (shortRes.data?.data?.result) {
        shortenedUrl = shortRes.data.data.result;
      } else if (shortRes.data?.result) {
        shortenedUrl = shortRes.data.result;
      } else if (shortRes.data?.data) {
        shortenedUrl = shortRes.data.data;
      }
    } catch (err) {
      console.error("Failed to shorten URL:", err);
      // Continue with original URL if shortening fails
    }

    let linkButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel(`Download Here`)
        .setURL(shortenedUrl)
    );

    loadingTxt.edit({
      content: `<:ic_repost:1334863701026541648> [media](${shortenedUrl})`,
      components: [linkButton]
    });
  },
});
