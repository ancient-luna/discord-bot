module.exports = {
  name: "ticketmention",
  id: "btn-ticketmention",
  permissions: {
    client: [],
    user: [],
    dev: false,
  },

  execute: async (client, interaction) => {
    const mentionTxt = [
      'Please be alive dear',
      'Wake up',
      'Hey, I think this seeker need your help',
      'Psst.. pssst..'
    ]
    const ancestorID = client.config.ancestorRole;
    const lunariaID = client.config.lunariaRole;
    return interaction.reply({
      content: `${mentionTxt[Math.floor(Math.random() * mentionTxt.length)]} <@&${ancestorID}> <@&${lunariaID}> !\n-# Please check this ticket ♡ before the sun is set`
    });
  },
};
