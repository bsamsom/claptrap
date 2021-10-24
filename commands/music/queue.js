const Table = require('easy-table');
module.exports = {
	name: 'queue',
	description: 'Gets a list of all queued songs.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	async execute(message) {
		client = message.client;
		let guildQueue = client.player.getQueue(message.guild.id);
		message.channel.send('```Queue:\n'+(guildQueue.songs.map((song, i) => {
			return `#${i+1} - ${song.name} | ${song.author}`
		}).join('\n')) + '```');
	},
};