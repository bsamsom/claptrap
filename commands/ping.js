module.exports = {
	name: 'ping',
	description: 'Ping!',
	args: false,
	usage: '',
	guildOnly: false,
	execute(message, args) {
		message.channel.send('Pong.')
	},
}