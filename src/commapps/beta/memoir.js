const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('memoir')
    .setDescription('a memoir is how one remembers one’s own life'),
    async execute(interaction, client) {
        
        await interaction.reply({
            content: `[Some flashes rose](https://youtu.be/wq0DURi1ekY)\n["Ad Agama vus Dae" the keeper](https://youtu.be/SJoqzhnqz3c)\n[They're all bound as one](https://youtu.be/QgQ4xAr0A6k)\n[Remember what we ever built, dear Seekers?](https://youtu.be/rPnPdPTsFxs) ╮`
        }).catch((e) => {});
    }
}