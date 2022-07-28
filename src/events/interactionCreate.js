module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isCommand()) handleSlashCommand(interaction, client);
        else if (interaction.isButton()) handleButton(interaction, client);
    },
}

const handleButton = (interaction, client) => {
    
    const [name, ...params] = interaction.customId.split("-")

    const button = client.buttons.get(name)

    if (!button) return

    (async () => {
        try {
            await button.run(interaction, client, params);
        } catch (error) {
            console.log(error);
            await interaction.reply({
                content: 'There was an error while executing this button!',
                ephemeral: true
            });
        }
    })();
}

const handleSlashCommand = (interaction, client) => {

    const command = client.commands.get(interaction.commandName);

    if (!command) return

    (async () => {
        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.log(error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
    })();
}