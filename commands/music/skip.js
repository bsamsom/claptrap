module.exports = {
	name: 'skip',
	description: 'Skip the current song.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	async execute(message) {
		client = message.client;
		let guildQueue = client.player.getQueue(message.guild.id);
		guildQueue.skip();
	},
};