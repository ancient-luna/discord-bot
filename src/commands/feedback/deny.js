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
            .setAuthor(data.author.name, "https://i.imgur.com/oZvnuem.png")
            .setTitle('Suggestion Denied')
            .setDescription(data.description)
            .setColor(`RED`)
            .addField(`Reason from ${editor}`, denyQuery)
            .setTimestamp()
        
        message.channel.send("Suggestion: **DENIED** ! `updated`");
        suggestedEmbed.edit(acceptEmbed);

        const user = await client.users.cache.find(
            (u) => u.tag === data.author.name
        );
        user.send("Your suggestion has been **DENIED** by the Elders. Thank you");
    } catch (err) {
        console.log(err);
        message.channel.send(`That suggestion doesn't exist.`);
    }
}

module.exports.help = {
    name: 'deny'
}
