const { EmbedBuilder } = require("discord.js");

module.exports = new Object({
    name: "accept",
    description: "accepting suggestion",
    category: "suggestion",
    usage: `${client.prefix}accept <messageID> <reason>`,
    cooldown: 0,
    aliases: [],
    examples: [],
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

        if (!messageID || !acceptQuery) {
            return message.reply("`accept/deny` `messageid` `reason`");
        }

        try {
            const suggestionChannel = message.guild.channels.cache.get("842069893113446410");
            const editor = message.member.displayName;
            const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);
            const data = suggestedEmbed.embeds[0];

            const acceptEmbed = new EmbedBuilder()
                .setAuthor({ name: data.author.name, iconURL: 'https://i.imgur.com/Kll2T98.png' })
                .setTitle('SUGGESTION ACCEPTED')
                .setDescription(data.description)
                .setColor(`43b581`)
                .addFields(
                    { name: `⁣`, value: `-# Reason from **${editor}** : ${acceptQuery}` }
                )
                .setTimestamp()

            suggestedEmbed.edit({ embeds: [acceptEmbed] });

            const suggester = client.users.cache.find(
                (u) => u.username === data.author.name
            );

            const suggestionLink = `https://discord.com/channels/447069790150852609/842069893113446410/${messageID}`

            const accEmbed = new EmbedBuilder()
                .setAuthor({ name: "SUGGESTION ACCEPTED", iconURL: 'https://i.imgur.com/Kll2T98.png' })
                .setDescription(`Your suggestion has been accepted by the Elders\n-# See further detail in [#suggestions](${suggestionLink})`)
                .setTimestamp()
                .setColor("43b581")
                .setFooter({ text: "Thank you for the suggestion!" })

            const failed = new EmbedBuilder()
                .setDescription(`<:srv_deny:1334881089205829674> Failed sending DM to <@${suggester.id}> due they close their DMs`)
                .setColor(client.config.embedColorTrans)

            const success = new EmbedBuilder()
                .setDescription(`<:srv_accept:1334881070449164378> Success sending DM to <@${suggester.id}>`)
                .setColor(client.config.embedColorTrans)

            await suggester.send({ embeds: [accEmbed] }).then(() => {
                message.channel.send({
                    content: `SUGGESTION: ${suggestionLink} **ACCEPTED** ! \`updated\`\n_ _`,
                    embeds: [success]
                });
            }).catch((e) => {
                message.channel.send({
                    content: `SUGGESTION: ${suggestionLink} **ACCEPTED** ! \`updated\`\n_ _`,
                    embeds: [failed]
                });
            });
            
        } catch (err) {
            console.log(err);
            message.channel.send(`\`\`\`${err}\`\`\``);
        }
    }
});