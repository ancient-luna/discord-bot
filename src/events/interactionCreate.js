const { Collection, CommandInteraction } = require('discord.js');

module.exports = new Object({
  name: "interactionCreate",

  /**
   * @param {*} client
   * @param {CommandInteraction} interaction
   */

  async execute(client, interaction) {
    if (interaction.isChatInputCommand() || interaction.isCommand()) {
      if (!interaction.guild) {
        return interaction.reply({ content: 'This command can only be run within a guild/server!', ephemeral: true }); // kalo bukan di guild
      }

      if (!client.slashCommands.has(interaction.commandName)) {
        return interaction.reply({ content: 'Cannot find that command. Might no longer exist!', ephemeral: true }); // kalo command nya gak ada
      }

      const command = client.slashCommands.get(interaction.commandName);

      try {
        if (!client.Cooldown.has(command.name)) {
          client.Cooldown.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = client.Cooldown.get(command.name);
        const cooldownAmount = command.cooldown || 2 * 1000;

        if (timestamps.has(interaction.user.id)) {
          const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return interaction.reply({
              content: `Wait ${timeLeft.toFixed(1)} more second${timeLeft.toFixed(1) < 2 ? '' : 's'} to use **${command.name}**`, // cooldown message
              ephemeral: true
            });
          }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        if (command.permissions) {
          if (!interaction.member.permissions.has(command.permissions)) {
            return interaction.reply({
              content: `You're missing permissions : ${command.permissions.map((p) => `**${p}**`).join(', ')}`, // permission message
              ephemeral: true
            });
          }
        }

        await command.run(client, interaction);
        // console.log("test interaction slash");
      } catch (err) {
        client.console.log(err, "error");
        await interaction.reply({ content: 'An error has occured', ephemeral: true });
      }
    }
    if (interaction.isButton()) {
      client.emit("ButtonInteraction", interaction);
    }
    /**
       if (interaction.isChatInputCommand()) {
      await commandHandler.handleSlashCommand(interaction);
    }
     */
    if (!interaction.isModalSubmit() && !interaction.isStringSelectMenu())
      return;
  },
});
