module.exports = {
	name: 'roles',
	description: 'Lists all roles on a server.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	execute(message) {
		message.guild.roles.fetch()
		.then(allRoles => {
			let printString = `There are ${allRoles.size} roles: \n` + '```';
			allRoles.forEach((role) => {
				printString += role.name + '\n';
			});
			printString += '```';
			message.channel.send(printString);
		})
		.catch(console.error);
	},
};