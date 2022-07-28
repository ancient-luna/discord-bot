module.exports = {
    name: "role",
    run: async (client, interaction, parameters) => {

        const roleId = parameters[0]

        const role = await interaction.guild.roles.fetch(roleId)

        if (!role) return interaction.reply({ content: 'role not found', ephemeral: true })

        const member = await interaction.guild.members.fetch(interaction.member.id)

        if (member.roles.cache.has(role.id)) {
            await member.roles.remove(role.id)
            return interaction.reply({ content: `you remove ${role.name} from yourself, what a cunt`, ephemeral: true })
        }
        else {
            await member.roles.add(role.id)
            return interaction.reply({ content: `you are having ${role.name} now`, ephemeral: true })
        }
    }
}