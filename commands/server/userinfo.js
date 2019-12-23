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
		message.channel.send(`Username: ${user.username}, ID: ${user.id}`);
	},
};