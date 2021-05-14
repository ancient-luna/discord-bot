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
        const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);
        console.log(suggestedEmbed);
        const data = suggestedEmbed.embeds[0];
        const acceptEmbed = new MessageEmbed()
            .setAuthor(data.author.name, data.author.iconURL)
            .setDescription(data.description)
            .setColor(`GREEN`)
            .addField("**Status**: **(ACCEPTED)**", acceptQuery);
        
        message.channel.send("Suggestion: **ACCEPTED** ! `updated`");
        suggestedEmbed.edit(acceptEmbed);

        const user = await client.users.cache.find(
            (u) => u.tag === data.author.name
        );
        user.send("Your suggestion has been **ACCEPTED** by the Elders. Thank you");
    } catch (err) {
        console.log(err);
        message.channel.send(`That suggestion doesn't exist.`);
    }
}

module.exports.help = {
    name: 'accept'
}