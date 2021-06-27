const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const suggestionQuery = args.join(' ');
  if (!suggestionQuery) return message.reply('Please specify a suggestion.');

  const embed = new MessageEmbed()
    .setAuthor(message.author.tag)
    .setDescription(`**Suggestion**: ${suggestionQuery}`)
    .setColor('4f545c')
    .setFooter('⏱️ Status: PENDING');

  message.channel.send('Submitted suggestion is at <#842069893113446410> !');
  message.guild.channels.cache.get('842069893113446410').send(embed).then((msg) => {
    msg.react('⬆️');
    msg.react('⬇️');
  });

  await message.delete();
};

module.exports.help = {
  name: 'suggest',
};
