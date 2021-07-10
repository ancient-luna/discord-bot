const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const suggestionQuery = args.join(' ');
  if (!suggestionQuery) return message.reply('Please specify a suggestion.');

  const embed = new MessageEmbed()
    .setAuthor(message.author.tag)
    .setDescription(`${suggestionQuery}`)
    .setColor('4f545c')

  message.channel.send('Submitted suggestion is at <#842069893113446410> !').then((msg) => {
    setTimeout(() => { msg.delete() }, 5000)
  });

  message.guild.channels.cache.get('842069893113446410').send(embed).then((msg) => {
    msg.react('<:vcon_vote_upvote:859075141051613214>');
    msg.react('<:vcon_vote_disagree:859075141668700200>');
  });

  await message.delete();
};

module.exports.help = {
  name: 'suggest',
};
