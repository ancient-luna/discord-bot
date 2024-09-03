const { EmbedBuilder, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const canvafy = require('canvafy');

module.exports = {
    name: "spotify",
    description: "spotify.",
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
        let listener = message.mentions.members.first() || message.member;

        const loadingTxt = await message.reply(`Tracking on what **${listener.displayName}** is listening to <a:_util_loading:863317596551118858>`);

        if (!listener.presence || !listener.presence.activities) {
            return await loadingTxt.edit({ content: `**${listener.displayName}**'s presence or activities data is not available.` });
        }

        let status = listener.presence.activities.find(activity => activity.name === "Spotify" && activity.type === 2); // Type 2 corresponds to 'LISTENING'

        if (!status) {
            return await loadingTxt.edit({ content: `**${listener.displayName}** is not listening to Spotify.` });
        }

        if (status.assets) {
            let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`;
            let name = status.details;
            let artist = status.state;
            let album = status.assets.largeText;
            let startTimestamp = new Date(Date.now()).getTime() - new Date(status.timestamps.start).getTime();
            let endTimestamp = new Date(status.timestamps.end).getTime() - new Date(status.timestamps.start).getTime();

            const spotify = await new canvafy.Spotify()
                .setAuthor(artist)
                .setAlbum(album)
                .setTimestamp(startTimestamp, endTimestamp)
                .setImage(image)
                .setTitle(name)
                .setBlur(5)
                .setOverlayOpacity(0.7);

            const Card = await spotify.build();
            const attachments = new AttachmentBuilder(Card, { name: "spotify.png" });

            const embed = new EmbedBuilder()
                .setTitle(`${listener.displayName} is currently listening to`)
                .setImage(`attachment://spotify.png`)
                .setTimestamp()
                .setColor(`1db954`)
                .setFooter({ text: `Spotify`, iconURL: `https://i.imgur.com/o0RHwu2.png` });

            const trackId = status.syncId;

            const link = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel(`Listen now`)
                        .setURL(`https://open.spotify.com/track/${trackId}`)
                );

            await loadingTxt.edit({
                content: '⁣',
                embeds: [embed],
                files: [attachments],
                components: [link]
            });
        }
    }
};
