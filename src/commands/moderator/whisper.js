/* eslint-disable */
module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES")) return;
  if (args.length === 0) return message.channel.send("Wrong usage. !whisper [userid] [message] `optional to remove id:[-noid]`");

  const user =
    message.mentions.users.first() ||
    message.guild.members.cache.get(args[0]).user;
  
  const str = args.slice(1).join(" ");
  if (message.content.includes("-noid")) {
    user.send(str.replace("-noid", ""));
  } else {
    user.send(`${message.author.tag}: ${str}`);
  }
}

module.exports.help = {
  name: 'whisper'
}