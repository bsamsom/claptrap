module.exports = {
	name: 'ping',
	description: 'Used to determine if the bot is online.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: false,
	execute(message, args) {
		message.channel.send('Pong.')
	},
}