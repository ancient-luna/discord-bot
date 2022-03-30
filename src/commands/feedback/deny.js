const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    const messageID = args[0];
    const denyQuery = args.slice(1).join(" ");

    if(!messageID) return message.reply("`accept/deny` `messageid` `reason`");
    if(!denyQuery) return message.reply("`accept/deny` `messageid` `reason`");

    try {
        const suggestionChannel = message.guild.channels.cache.get(
            "842069893113446410"
        );
        const editor = message.author.tag;
        const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);
        const data = suggestedEmbed.embeds[0];
        const acceptEmbed = new MessageEmbed()
            .setAuthor({ name: data.author.name }, { name: "https://i.imgur.com/oZvnuem.png" })
            .setTitle('Suggestion Denied')
            .setDescription(data.description)
            .setColor(`RED`)
            .addField(`Reason from ${editor}`, denyQuery)
            .setTimestamp()
        
        message.channel.send("Suggestion: **DENIED** ! `updated`");
        suggestedEmbed.edit({ embeds: [acceptEmbed] });

        const user = await client.users.cache.find(
            (u) => u.tag === data.author.name
        );
        const denyEmbed = new MessageEmbed()
            .setAuthor({ name: "SUGGESTION DENIED" }, { name: "https://i.imgur.com/oZvnuem.png" })
            .setDescription("Your suggestion has been denied by the Elders. Find out why in **[Ancient Luna Discord Server](https://discord.com/invite/Sbp2nt8QHe)**. Thank you for the suggestion!")
            .setTimestamp()
            .setColor("RED")
            .setFooter({ text: "#feedback" })
        user.send({ embeds: [denyEmbed] });
    } catch (err) {
        console.log(err);
        message.channel.send(`That suggestion doesn't exist.`);
    }
}

module.exports.help = {
    name: 'deny'
}
