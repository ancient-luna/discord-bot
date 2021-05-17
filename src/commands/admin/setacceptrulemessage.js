const { save } = require('../../config/index');

module.exports.run = async (client, message, args, config) => {
  if (!args || args.length === 0) return message.reply('Usage: !setacceptrulemessage <message>');
  const ruleMessage = args.join(' ');
  if (ruleMessage === config.server.onJoinConfig.preMemberTriggerMessage) return message.reply('Please set a different message than what is currently set.');

  // eslint-disable-next-line no-param-reassign
  config.server.onJoinConfig.preMemberTriggerMessage = ruleMessage;

  save(config)
    .then(() => message.reply('New accept rule message is set'))
    .catch(() => message.reply('There was an error in saving the new message in config'))

  return null;
};

module.exports.help = {
  name: 'setacceptrulemessage',
};
