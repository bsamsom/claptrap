module.exports = {
	name: 'stop',
	description: 'Stop all songs in the queue.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.end();
			serverQueue.songs = [];
			message.client.queue = new Map();
			message.channel.send(':octagonal_sign: Stopped all music.');
			return false;
		}
		else{
			message.channel.send('There is nothing playing.');
			return false;
		}

	},
};