const { EmbedBuilder } = require("discord.js");

module.exports = new Object({
    name: "accept",
    description: "accept.",
    category: "FeedBack",
    usage: "",
    cooldown: 0,
    aliases: [],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
        user: ['ManageMessages'],
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
        const messageID = args[0];
        const acceptQuery = args.slice(1).join(" ");

        if (!messageID) return message.reply("`accept/deny` `messageid` `reason`").catch((e) => { });
        if (!acceptQuery) return message.reply("`accept/deny` `messageid` `reason`").catch((e) => { });

        try {
            const suggestionChannel = message.guild.channels.cache.get(
                "842069893113446410"
            );
            const editor = message.author.tag;
            const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);
            const data = suggestedEmbed.embeds[0];
            const acceptEmbed = new EmbedBuilder()
                .setAuthor({ name: data.author.name, iconURL: 'https://i.imgur.com/Kll2T98.png' })
                .setTitle('Suggestion Accepted')
                .setDescription(data.description)
                .setColor(`GREEN`)
                .addFields(
                    { name: `Reason from ${editor}`, value: acceptQuery }
                )
                .setTimestamp()

            message.channel.send("Suggestion: **ACCEPTED** ! `updated`").catch((e) => { });
            suggestedEmbed.edit({ embeds: [acceptEmbed] }).catch((e) => { });

            const user = client.users.cache.find(
                (u) => u.tag === data.author.name
            );
            const accEmbed = new EmbedBuilder()
                .setAuthor({ name: "SUGGESTION ACCEPTED", iconURL: 'https://i.imgur.com/Kll2T98.png' })
                .setDescription("Your suggestion has been accepted by the Elders. See further detail in **[Ancient Luna Discord Server](https://discord.com/invite/Sbp2nt8QHe)**. Thank you for the suggestion!")
                .setTimestamp()
                .setColor("GREEN")
                .setFooter({ text: "Your Suggestions Status" })
            user.send({ embeds: [accEmbed] }).catch((e) => { });
        } catch (err) {
            console.log(err);
            message.channel.send(`That suggestion doesn't exist.`).catch((e) => { });
        }
    }
});


