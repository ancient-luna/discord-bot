const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('summon')
        .setDescription('call out my name, im yours to tame'),
    async execute(interaction) {
        return interaction.reply({
            content: `I'm totally yours to tame, Dae.\n\n● [ancientluna.org](<https://ancientluna.org/>)\n● [support the dev](<https://ko-fi.com/daekid>)\n● [discord server](<https://discord.com/invite/Sbp2nt8QHe>)\n● [youtube channel](<https://www.youtube.com/@ancientluna5033>)\n\n달빛 아래 떠오르는 [mae](https://youtu.be/pCZkSSj840Q) [woo](https://youtu.be/BeuyADHzeE4)\nI'm a relic that born to seek wisdom ╮`
        }).catch((e) => { });
    },
};
