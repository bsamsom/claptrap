const Table = require('easy-table');
module.exports = {
	name: 'queue',
	description: 'Gets a list of all queued songs.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	execute(message) {
		let channel = '';
		if(message.channel) {
			channel = message.channel;
		}
		else{
			channel = message;
		}
		data = new Table();
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('There is nothing in the queue.');
		songs = serverQueue.songs;
		for(i = 0; i < songs.length; i++){
			data.cell('Position:', i);
			data.cell('Title:', songs[i].title);
			data.cell('Url:', songs[i].url);
			data.newRow();
		}
		channel.send('```' + data.toString() + '```');
	},
};