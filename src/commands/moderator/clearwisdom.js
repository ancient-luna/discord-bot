/* eslint-disable */

module.exports.run = async (client, message, args) => {
  if (args.length !== 1) return message.channel.send('Wrong usage. !clearwisdom [1-100]');

  const numberOfMessages = args[0];

  if (numberOfMessages > 100 || numberOfMessages < 0) return message.channel.send('Invalid number of messages. !clearwisdom [1-100]');

  await message.channel.bulkDelete(numberOfMessages)
    .then((messages) => {
      util.printLog('info', `Bulk deleted ${messages.size} messages`);
    })
    .catch(console.error);
}

module.exports.help = {
  name: 'clearwisdom'
}