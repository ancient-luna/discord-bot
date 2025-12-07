const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, ContainerBuilder, MediaGalleryBuilder, TextDisplayBuilder } = require("discord.js");
const axios = require("axios");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("link")
        .setDescription("Show and download content from any platforms")
        .addStringOption(option =>
            option.setName("url")
                .setDescription("The URL of the content to show")
                .setRequired(true)
        ),
    cooldown: 5,

    async execute(client, interaction) {
        const link = interaction.options.getString("url");

        await interaction.deferReply();

        const downloadApiUrl = `https://api.ferdev.my.id/downloader/allinone?link=${encodeURIComponent(link)}&apikey=${process.env.RES_API}`;
        
        let res;
        try {
            res = await axios.get(downloadApiUrl, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (compatible)",
                },
            });
        } catch (err) {
            return interaction.editReply({ content: `**By the moon!** Something went wrong while fetching the data **[${err.response?.status || 'Unknown'}]**`, ephemeral: MessageFlags.Ephemeral });
        }

        const data = res.data?.data || res.result;
        if (!data) return interaction.editReply({ content: `**By the moon!** Something went wrong while fetching the data`, ephemeral: MessageFlags.Ephemeral });

        if (data.source === "youtube") {
            try {
                let downloadOptions = '';
                
                const videoMedias = data.medias
                    .filter(media => media.type === "video" && media.ext === "mp4")
                    .sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));
                
                const topVideos = videoMedias.slice(0, 2);
                
                const m4aAudios = data.medias
                    .filter(media => media.type === "audio" && media.ext === "m4a")
                    .sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));
                const topM4a = m4aAudios.slice(0, 1);
                
                if (topVideos.length > 0) {
                    downloadOptions += '`Video`';
                    topVideos.forEach((media, index) => {
                        const resolutionMatch = media.quality?.match(/\((\d+)p\)/);
                        const resolution = resolutionMatch ? `${resolutionMatch[1]}p` : `${Math.round((media.bitrate || 0) / 1000)}kbps`;
                        const separator = index === topVideos.length - 1 ? ' ' : ' ,';
                        downloadOptions += ` [${resolution}](${media.url})${separator}`;
                    });
                }
                
                if (topM4a.length > 0) {
                    if (topVideos.length > 0) downloadOptions += '';
                    downloadOptions += '`Audio`';
                    const media = topM4a[0];
                    const qualityLabel = media.quality || `${media.ext} (${Math.round((media.bitrate || 0) / 1000)}kbps)`;
                    const cleanLabel = qualityLabel.replace(/\s*\(\d+kb\/s\)/, '').replace('audio only ', '');
                    downloadOptions += ` [${cleanLabel}](${media.url})`;
                }

                const ytContainer = new ContainerBuilder()
                const ytThumbnail = new MediaGalleryBuilder()
                    .addItems([{
                        type: 'image',
                        media: {
                            url: data.thumbnail
                        } 
                    }]);
                const ytTitle = new TextDisplayBuilder().setContent(data.title);
                const ytDownload = new TextDisplayBuilder().setContent(downloadOptions);
                const ytHow = new TextDisplayBuilder().setContent('-# <:ic_repost:1334863701026541648> click link to download');
                ytContainer.addTextDisplayComponents(ytTitle, ytDownload);
                    
                return await interaction.editReply({
                    flags: MessageFlags.IsComponentsV2,
                    components: [ytThumbnail, ytContainer, ytHow]
                });
            } catch (error) {
                console.error('Error processing YouTube link:', error);
                return interaction.editReply({ content: `**By the moon!** Something went wrong while processing the YouTube link.`, ephemeral: MessageFlags.Ephemeral });
            }
        }

        const validMedias = data.medias?.filter(media => media.type === "video" || media.type === "image") || [];

        if (validMedias.length > 1) {
            try {
                const gallery = new MediaGalleryBuilder();
                const items = validMedias.map(media => ({
                    type: media.type === "video" ? "video" : "image",
                    media: { url: media.url }
                }));
                gallery.addItems(items);

                const title = `[${data.title}](${data.url})` || "Content";
                const container = new ContainerBuilder();
                const description = new TextDisplayBuilder().setContent(`-# <:ic_repost:1334863701026541648> ${validMedias.length} medias from ${title}`);
                
                container.addMediaGalleryComponents(gallery);
                container.addTextDisplayComponents(description);

                return await interaction.editReply({
                    flags: MessageFlags.IsComponentsV2,
                    components: [container]
                });
            } catch (error) {
                console.error('Error processing multi-media link:', error);
                return interaction.editReply({ content: `**By the moon!** Something went wrong while processing the media gallery.`, ephemeral: MessageFlags.Ephemeral });
            }
        }

        const contentURL = data.medias?.find(media => media.type === "video" || media.type === "image")?.url;
        
        if (!contentURL) return interaction.editReply({ content: `Failed to find the media URL. **Please check the link or try again.**`, ephemeral: MessageFlags.Ephemeral });

        let shortenedUrl = contentURL;
        try {
            const shortenerApiUrl = `https://api.ferdev.my.id/tools/shortlink?link=${encodeURIComponent(contentURL)}&apikey=${process.env.RES_API}`;
            const shortRes = await axios.get(shortenerApiUrl);
            if (shortRes.data.success && shortRes.data.result) {
                shortenedUrl = shortRes.data.result;
            }
        } catch (err) {
            console.error('URL shortening failed:', err.message);
        }

        const description = `-# <:ic_repost:1334863701026541648> displayed [content](${contentURL})`;
        const linkButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('Download')
                .setStyle(ButtonStyle.Link)
                .setURL(shortenedUrl),
            new ButtonBuilder()
                .setLabel('View')
                .setStyle(ButtonStyle.Link)
                .setURL(link),
        );

        await interaction.editReply({
            content: description,
            components: [linkButton]
        });
    },
};
