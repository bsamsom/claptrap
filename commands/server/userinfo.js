module.exports = {
	name: 'userinfo',
	description: 'Get information about a user.',
	aliases: [''],
	args: false,
	usage: '<@username>',
	guildOnly: true,
	execute(message) {
		const member = message.mentions.members.first();
		const user = member.user;
		//const memberPermissions = user.permissions.toArray();
		//console.log(memberPermissions)
		// if (message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
		// 	console.log('This member can kick');
		// }
		message.channel.send(`Username: ${user.username}, ID: ${user.id}`);
	},
};