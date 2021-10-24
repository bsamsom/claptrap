module.exports = {
	name: 'stop',
	description: 'Stop all songs in the queue.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	async execute(message) {
		client = message.client;
		let guildQueue = client.player.getQueue(message.guild.id);
		guildQueue.stop();
	},
};