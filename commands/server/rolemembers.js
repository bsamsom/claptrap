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
		var roles;
		message.guild.roles.fetch()
		.then(allroles => {
			allroles.cache.forEach((role) => {
				//console.log(role.name);
				//console.log(args[0].toLowerCase());
				if(role.name === args[0].toLowerCase()){
					let members = role.members.map(m=>m.user.tag);
					//console.log(members);
					let printString = `There are ${members.length} members with the Role of ${args[0]}:\n` + '```';
					members.forEach((user) => {
						//console.log(user);
						printString += user + '\n';
					});
					printString += '```';
					message.channel.send(printString);
				}
			})
		})
		.catch(console.error);
	},
};