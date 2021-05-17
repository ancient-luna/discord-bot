const { save } = require('../../config/index');

module.exports.run = async (client, message, args, config) => {
  if (!args || args.length === 0 || args.length > 1) return message.reply('Usage: !setgeneralchannel <channelId>');

  // eslint-disable-next-line no-param-reassign
  config.server.generalChannel = message.channel.id;

  save(config)
    .then(() => message.reply('New general channel is set'))
    .catch(() => message.reply('There was an error in saving the new general channel in config'));

  return null;
};

module.exports.help = {
  name: 'setgeneralchannel',
};
