module.exports = {
	name: 'rolemembers',
	description: 'Lists all members on a server with the provided role.',
	aliases: [''],
	args: true,
	usage: '<role>',
	guildOnly: true,
	execute(message, args) {
		// user roles
		const guild = message.guild;
		const roles = message.guild.roles.find(role => role.name === args[0]);
		if(roles != null) {
			const membersWithRole = message.guild.roles.get(roles.id).members;
			let printString = `there are ${membersWithRole.size} members with the Role of: ${args[1]}\n`;
			membersWithRole.forEach((user) => {
				const member = guild.member(user);
				printString += '\t' + member.displayName + '\n';
			});
			message.channel.send(printString);
		}
	},
};