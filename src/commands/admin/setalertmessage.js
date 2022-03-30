const { save } = require('../../config/index');

module.exports.run = async (client, message, args, config) => {
  if (!args || args.length === 0) return message.reply({ content: 'Usage: !setalertmessage <message>' });
  const voiceMessage = args.join(' ');
  if (voiceMessage === config.server.voiceMessage) return message.reply({ content: 'Please set a different message than what is currently set.' });

  // eslint-disable-next-line no-param-reassign
  config.server.voiceMessage = voiceMessage;

  save(config)
    .then(() => message.reply({ content: 'New voice message is set' }))
    .catch(() => message.reply({ content: 'There was an error in saving the new voice message in config' }))

  return null;
};

module.exports.help = {
  name: 'setalertmessage',
};
