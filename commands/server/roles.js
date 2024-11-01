const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Lists all roles on a server.'),
	async execute(interaction) {
		const role = interaction.options.getRole('role');
		 interaction.guild.roles.fetch()
		.then(allRoles => {
			let printString = `There are ${allRoles.size} roles: \n` + '```';
			allRoles.forEach((role) => {
				printString += role.name + '\n';
			});
			printString += '```';
			interaction.reply(printString);
		})
		.catch(console.error);
	},
}