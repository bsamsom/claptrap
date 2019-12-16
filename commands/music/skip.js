module.exports = {
	name: 'skip',
	description: 'Skip the current song.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
		if (!serverQueue) return message.channel.send('There is no song that I could skip!');
		serverQueue.connection.dispatcher.end();
	},
};