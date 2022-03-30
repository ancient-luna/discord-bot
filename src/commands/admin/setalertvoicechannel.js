const { save } = require('../../config/index');

module.exports.run = async (client, message, args, config) => {
  const member = message.member.voice.channel;

  if(!member) {
    return message.reply({ content: 'You need to be in a voice channel before using this command' });
  }

  // eslint-disable-next-line no-param-reassign
  config.server.voiceChannel = message.member.voice.channelID;

  let channelName = message.member.voice.channel.name;

  save(config)
    .then(() => message.reply({ content: `New voice channel for automatic notice is set on ${channelName}` }))
    .catch(() => message.reply({ content: 'There was an error in saving the new voice channel in config' }));

  return null;
};

module.exports.help = {
  name: 'setalertvoicechannel',
};
