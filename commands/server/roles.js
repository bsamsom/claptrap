module.exports = {
	name: 'roles',
	description: 'Lists all roles on a server.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	execute(message) {
		const allRoles = message.guild.roles;
		let printString = '';
		allRoles.forEach((role) => {
			printString += role.name + ', ';
		});
		// remove extra ', '
		printString = printString.substr(0, printString.length - 2);
		message.channel.send(printString);
	},
};