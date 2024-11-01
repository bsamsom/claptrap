const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rolemembers')
		.setDescription('Lists all members on a server with the provided role.')
        .addRoleOption(option =>
            option
                .setName('muted')
                .setDescription('The role to find members for')
                .setRequired(true)
        ),
	async execute(interaction) {
		const role = interaction.options.getRole('muted')
		if (!role) {
            await interaction.reply(`Role ${role} not found`);
            return;
        }
		const membersWithRole = interaction.guild.members.cache.filter(member => member.roles.cache.has(role.id));

        if (membersWithRole.size === 0) {
            await interaction.reply(`No members found with the role: **${role.name}**`);
        } else {
            const memberNames = membersWithRole.map(member => member.user.username).join(', ');

            await interaction.reply(`Members with the role **${role.name}**: ${memberNames}`);
        }
	},
}