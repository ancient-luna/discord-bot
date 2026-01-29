const tagguildpc = require('./tagguildpc.js');
const tagguildmobile = require('./tagguildmobile.js');

module.exports = {
    name: "menutagguild",
    id: "menu-tagguild",
    permissions: {
        client: [],
        user: [],
        dev: false,
    },

    execute: async (client, interaction) => {
        const value = interaction.values[0];

        if (value === 'tagguildpc') {
            return tagguildpc.execute(client, interaction);
        } else if (value === 'tagguildmobile') {
            return tagguildmobile.execute(client, interaction);
        }
    },
};
