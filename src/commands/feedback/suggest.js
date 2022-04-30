const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const suggestionQuery = args.join(' ');
  
  if (!suggestionQuery) return message.reply('Please specify a suggestion.').catch((e) => {});

  const embed = new MessageEmbed()
    .setAuthor({ name: message.author.tag })
    .setDescription(`${suggestionQuery}`)
    .setColor('4f545c')

  message.channel.send('Submitted suggestion is at <#842069893113446410> !').then((msg) => {
    setTimeout(() => { msg.delete().catch((e) => {}) }, 5000)
  });

  message.guild.channels.cache.get('842069893113446410').send({ embeds: [embed] }).then((msg) => {
    msg.react('<:vcon_vote_upvote:859075141051613214>').catch((e) => {});
    msg.react('<:vcon_vote_disagree:859075141668700200>').catch((e) => {});
  }).catch((e) => {});

  await message.delete().catch((e) => {});
};

module.exports.help = {
  name: 'suggest',
};
