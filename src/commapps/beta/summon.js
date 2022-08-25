const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('summon')
    .setDescription('call out my name, im yours to tame'),
    async execute(interaction, client) {
        
        await interaction.reply({
            content: `달빛 아래 떠오르는 [web](<https://ancientluna.org/>) . [support](<https://ko-fi.com/daekid>) . [discord](<https://discord.com/invite/Sbp2nt8QHe>) . [youtube](https://www.youtube.com/watch?v=rPnPdPTsFxs)\nI'm a relic that born to seek wisdom ╮`
        }).catch((e) => {});
    }
}