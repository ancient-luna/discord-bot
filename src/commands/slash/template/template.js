const { MessageEmbed, CommandInteraction } = require('discord.js');
const moment = require('moment');
require("moment-duration-format");

module.exports = {
	name: 'template',
	description: 'Cuma template',
	dir: 'template',
    permissions: ['ADMINISTRATOR'],
	cooldown: 5,
	options: [
		{
			name: 'temp_name',
			description: "Opsi dibutuhkan 1",
			type: 3,
			required: true,
			choices: [
				{ name: 'bla', value: 'val1' },
				{ name: 'bla1a', value: 'val2' },
                { name: 'dst', value: 'val3' },
			],
		},
        {
            name: 'temp_name2',
            description: 'Opsi dibutuhkan 2',
            type: 3,
            required: true,    
        },
        {
            name: `temp_name3`,
            description: `Opsi 3`,
            type: 3,
            required: false,
        },
	],

  /**
   *
   * @param {import('../index')} client 
   * @param { CommandInteraction } interaction
   */
    run: async (client, interaction) => {
        // CODE NYA DISINI
    },
};