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
			let printString = `There are ${allRoles.cache.size} roles: `;
			allRoles.cache.forEach((role) => {
				printString += role.name + ', ';
			});
			// remove extra ', '
			printString = printString.substr(0, printString.length - 2);
			message.channel.send(printString);
		})
		.catch(console.error);
	},
};