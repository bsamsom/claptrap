module.exports = {
	name: 'skip',
	description: 'Skip the current song.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	execute(message) {
		const queue = message.client.queue;
		const guild = message.guild;
		const serverQueue = queue.get(guild.id);
		if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to stop the music!');
		if (!serverQueue) return message.channel.send('There is no song that I could skip!');
		//serverQueue.connection.dispatcher.end("end");
		serverQueue.connection.dispatcher.end();
		const args = [ 'play' ];
		const command = args.shift().toLowerCase();
		serverQueue.songs.shift();
		message.client.commands.get(command).play(message, serverQueue.songs[0]);
		return message.channel.send(':arrow_right: Skipped song.');
	},
};