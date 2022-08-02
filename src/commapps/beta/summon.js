const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('summon')
    .setDescription('call out my name, im yours to tame'),
    async execute(interaction, client) {
        
        await interaction.reply({
            content: `_ _\nDon't leave\nSay I'm the only one you need\nSay I'm the only secret you keep\nDon't break me, don't break me down\n\n*[do you even realize?](https://open.spotify.com/track/5ngJKkOmjkN460b2ApBnLk?si=24e1844ec49b4db3)*\n\nNo, no-no, no, no-no-no-no\nI'm coming home even if I'm alone\nKnow that it's wrong\nBut I still wish you were here\nBaby, come here\n\nDon't break me down\nI don't wanna lose you now\n⁣`
        }).catch((e) => {});
    }
}