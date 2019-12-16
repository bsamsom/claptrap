module.exports = {
	name: 'nowplaying',
	description: 'Get the current song that is playing.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`Now playing: ${serverQueue.songs[0].title}`);
	},
};