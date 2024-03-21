const { EmbedBuilder } = require("discord.js");


module.exports = new Object({
    name: "deny",
    description: "deny.",
    category: "Suggestion",
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
            const editor = message.member.displayName;
            const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);
            const data = suggestedEmbed.embeds[0];

            const denyEmbed = new EmbedBuilder()
                .setAuthor({ name: data.author.name, iconURL: 'https://i.imgur.com/oZvnuem.png' })
                .setTitle('Suggestion Denied')
                .setDescription(data.description)
                .setColor(`f04947`)
                .addFields(
                    { name: `Reason from ${editor}`, value: denyQuery }
                )
                .setTimestamp()

            suggestedEmbed.edit({ embeds: [denyEmbed] });

            const suggester = await client.users.cache.find(
                (u) => u.username === data.user.username
            );
            
            const dnEmbed = new EmbedBuilder()
                .setAuthor({ name: "SUGGESTION DENIED", iconURL: 'https://i.imgur.com/oZvnuem.png' })
                .setDescription("Your suggestion has been denied by the Elders. Find out why in **[#suggestions](https://discord.com/channels/447069790150852609/842069893113446410)**. Thank you for the suggestion!")
                .setTimestamp()
                .setColor('f04947')
                .setFooter({ text: "Your Suggestions Status" })

            const errorEmbed = new EmbedBuilder()
                .setDescription("The user unable to receive DMs.")
                .setColor("43b581")

            await suggester.send({ embeds: [dnEmbed] }).catch((e) => {
                message.channel.send({ content: "Suggestion: **DENIED** ! `updated`", embeds: [errorEmbed] })
            });

            message.channel.send("Suggestion: **DENIED** ! `updated`");
            
        } catch (err) {
            console.log(err);
            message.channel.send(`\`\`\`${err}\`\`\``);
        }
    }
});