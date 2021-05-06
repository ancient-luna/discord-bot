/* eslint-disable */
module.exports.run = async (client, message, args) => {
  if (args.length === 0) return message.channel.send('Wrong usage. !whisper [message]');

  const msg = args.join(' ');

  await message.author.send(msg);
}

module.exports.help = {
  name: 'whisper'
}