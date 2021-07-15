const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    const messageID = args[0];
    const acceptQuery = args.slice(1).join(" ");

    if(!messageID) return message.reply("`accept/deny` `messageid` `reason`");
    if(!acceptQuery) return message.reply("`accept/deny` `messageid` `reason`");

    try {
        const suggestionChannel = message.guild.channels.cache.get(
            "842069893113446410"
        );
        const editor = message.author.tag;
        const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);
        const data = suggestedEmbed.embeds[0];
        const acceptEmbed = new MessageEmbed()
            .setAuthor(data.author.name, "https://i.imgur.com/Kll2T98.png")
            .setTitle('Suggestion Accepted')
            .setDescription(data.description)
            .setColor(`GREEN`)
            .addField(`Reason from ${editor}`, acceptQuery)
            .setTimestamp()
        
        message.channel.send("Suggestion: **ACCEPTED** ! `updated`");
        suggestedEmbed.edit(acceptEmbed);

        const user = await client.users.cache.find(
            (u) => u.tag === data.author.name
        );
        const accEmbed = new MessageEmbed()
            .setAuthor("SUGGESTION ACCEPTED", "https://i.imgur.com/Kll2T98.png")
            .setDescription("Your suggestion has been accepted by the Elders. See further detail in **[Ancient Luna Discord Server](https://discord.com/invite/Sbp2nt8QHe 'Ancient Luna Discord Server')**. Thank you for the suggestion!")
            .setTimestamp()
            .setColor("GREEN")
            .setFooter("#feedback")
        user.send(accEmbed);
    } catch (err) {
        console.log(err);
        message.channel.send(`That suggestion doesn't exist.`);
    }
}

module.exports.help = {
    name: 'accept'
}
