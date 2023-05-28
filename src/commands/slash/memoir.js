const { SlashCommandBuilder } = require('@discordjs/builders');

async function handleMemoirCommand(interaction) {
    await interaction.reply({
        content: `[Some flashes rose](https://youtu.be/wq0DURi1ekY)\n["Ad Agama vus Dae" the keeper](https://youtu.be/SJoqzhnqz3c)\n[They're all bound as one](https://youtu.be/QgQ4xAr0A6k)\n[Remember what we ever built, dear Seekers?](https://youtu.be/rPnPdPTsFxs) ╮`
    });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('memoir')
        .setDescription('A memoir is how one remembers one’s own life'),
    async execute(interaction) {
        if (interaction.isCommand()) {
            await handleMemoirCommand(interaction);
        }
    },
};
