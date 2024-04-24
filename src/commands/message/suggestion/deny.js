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

        if (!messageID || !denyQuery) {
            return message.reply("`accept/deny` `messageid` `reason`").catch(console.error);
        }

        try {
            const suggestionChannel = message.guild.channels.cache.get("842069893113446410");
            const editor = message.member.displayName;
            const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);
            const data = suggestedEmbed.embeds[0];

            const denyEmbed = new EmbedBuilder()
                .setAuthor({ name: data.author.name, iconURL: 'https://i.imgur.com/oZvnuem.png' })
                .setTitle('SUGGESTION DENIED')
                .setDescription(data.description)
                .setColor(`f04947`)
                .addFields(
                    { name: `Reason from ${editor}`, value: denyQuery }
                )
                .setTimestamp()

            suggestedEmbed.edit({ embeds: [denyEmbed] });

            const suggester = await client.users.cache.find(
                (u) => u.username === data.author.name
            );

            const suggestionLink = `https://discord.com/channels/447069790150852609/842069893113446410/${messageID}`

            const dnEmbed = new EmbedBuilder()
                .setAuthor({ name: "SUGGESTION DENIED", iconURL: 'https://i.imgur.com/oZvnuem.png' })
                .setDescription(`Your suggestion has been denied by the Elders. Find out why in **[#suggestions](${suggestionLink})**. Thank you for the suggestion!`)
                .setTimestamp()
                .setColor('f04947')
                .setFooter({ text: "Your Suggestions Status" })

            const failed = new EmbedBuilder()
                .setDescription(`<:wrong:1222439146593849425> Failed sending DM to <@${suggester.id}> due they close their DMs`)
                .setColor(client.config.embedColorTrans)

            const success = new EmbedBuilder()
                .setDescription(`<:check:1222439148720361502> Success sending DM to <@${suggester.id}>`)
                .setColor(client.config.embedColorTrans)

            await suggester.send({ embeds: [dnEmbed] }).then(() => {
                message.channel.send({
                    content: `SUGGESTION: ${suggestionLink} **DENIED** ! \`updated\``,
                    embeds: [success]
                });
            }).catch((e) => {
                message.channel.send({
                    content: `SUGGESTION: ${suggestionLink} **DENIED** ! \`updated\``,
                    embeds: [failed]
                });
            });

        } catch (err) {
            console.log(err);
            message.channel.send(`\`\`\`${err}\`\`\``);
        }
    }
});