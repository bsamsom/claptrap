module.exports = {
	name: 'pause',
	description: 'Pauses the current song.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	async execute(message) {
		client = message.client;
		let guildQueue = client.player.getQueue(message.guild.id);
		guildQueue.setPaused(true);
	},
};