const { EmbedBuilder } = require("discord.js");


module.exports = new Object({
    name: "deny",
    description: "deny.",
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
        const denyQuery = args.slice(1).join(" ");

        if (!messageID) return message.reply("`accept/deny` `messageid` `reason`").catch((e) => { });
        if (!denyQuery) return message.reply("`accept/deny` `messageid` `reason`").catch((e) => { });

        try {
            const suggestionChannel = message.guild.channels.cache.get("842069893113446410");
            const editor = message.author.tag;
            const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);
            const data = suggestedEmbed.embeds[0];
            const acceptEmbed = new EmbedBuilder()
                .setAuthor({ name: data.author.name, iconURL: 'https://i.imgur.com/oZvnuem.png' })
                .setTitle('Suggestion Denied')
                .setDescription(data.description)
                .setColor(`RED`)
                .addFields(
                    { name: `Reason from ${editor}`, value: denyQuery }
                )
                .setTimestamp()

            message.channel.send("Suggestion: **DENIED** ! `updated`").catch((e) => { });
            suggestedEmbed.edit({ embeds: [acceptEmbed] }).catch((e) => { });

            const user = await client.users.cache.find(
                (u) => u.tag === data.author.name
            );
            const denyEmbed = new EmbedBuilder()
                .setAuthor({ name: "SUGGESTION DENIED", iconURL: 'https://i.imgur.com/oZvnuem.png' })
                .setDescription("Your suggestion has been denied by the Elders. Find out why in **[Ancient Luna Discord Server](https://discord.com/invite/Sbp2nt8QHe)**. Thank you for the suggestion!")
                .setTimestamp()
                .setColor('Red')
                .setFooter({ text: "Your Suggestions Status" })
            user.send({ embeds: [denyEmbed] }).catch((e) => { });
        } catch (err) {
            console.log(err);
            message.channel.send(`That suggestion doesn't exist.`).catch((e) => { });
        }
    }
});




