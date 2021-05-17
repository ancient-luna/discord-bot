const { save } = require('../../config/index');

module.exports.run = async (client, message, args, config) => {
  if (!args || args.length === 0 || args.length > 1) return message.reply('Usage: !setprememberrole <channelId>');

  // eslint-disable-next-line no-param-reassign
  config.server.onJoinConfig.preMemberRole = message.channel.id;

  save(config)
    .then(() => message.reply('New pre member role is set.'))
    .catch(() => message.reply('There was an error in saving the new pre member role in config'));

  return null;
};

module.exports.help = {
  name: 'setprememberrole',
};
