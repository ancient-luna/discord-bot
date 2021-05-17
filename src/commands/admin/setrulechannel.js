const { save } = require('../../config/index');

module.exports.run = async (client, message, args, config) => {
  if (!args || args.length === 0 || args.length > 1) return message.reply('Usage: !setrulechannel <channelId>');

  // eslint-disable-next-line no-param-reassign
  config.server.ruleChannel = message.channel.id;

  save(config)
    .then(() => message.reply('New rule channel is set'))
    .catch(() => message.reply('There was an error in saving the new rule channel in config'));

  return null;
};

module.exports.help = {
  name: 'setrulechannel',
};
