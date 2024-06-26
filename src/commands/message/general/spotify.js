const { EmbedBuilder, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const canvacord = require('canvacord');

module.exports = new Object({
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

        let status;
        if (listener.presence.activities.length === 1) status = listener.presence.activities[0];
        else if (listener.presence.activities.length > 1) status = listener.presence.activities[1];

        if (listener.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {
            return await message.reply({ content: `${listener.displayName} is not listening to Spotify` });
        }

        if (status !== null && status.name === "Spotify" && status.assets !== null) {
            let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`;
            let name = status.details;
            let artist = status.state;
            let album = status.assets.largeText;

            const card = new canvacord.Spotify()
                .setAuthor(artist)
                .setAlbum(album)
                .setStartTimestamp(status.timestamps.start)
                .setEndTimestamp(status.timestamps.end)
                .setImage(image)
                .setTitle(name);

            const Card = await card.build();
            const attachments = new AttachmentBuilder(Card, { name: "spotify.png" });

            const embed = new EmbedBuilder()
                .setTitle(`Currently listening to`)
                .setImage(`attachment://spotify.png`)
                .setTimestamp()
                .setColor(`1db954`)
                .setFooter({ text: `Spotify`, iconURL: `https://i.imgur.com/o0RHwu2.png` });

            const trackId = status.syncId;

            const link = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setStyle(ButtonStyle.Link)
                            .setLabel(`listen the song here`)
                            .setURL(`https://open.spotify.com/track/${trackId}`)
                    )

            // Sending the message with embed and button
            await message.reply({
                embeds: [embed],
                files: [attachments],
                components: [link]
            });
        }
    }
});