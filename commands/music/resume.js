module.exports = {
	name: 'resume',
	description: 'Resumes the paused song.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	async execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send("▶ Resumed: " + serverQueue.songs[0].title);
		}
		else{
			return message.channel.send('There is nothing playing.');
		}
	},
};
