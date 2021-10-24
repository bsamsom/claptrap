module.exports = {
	name: 'skipto',
	description: 'jumps to requested position in song',
	aliases: ['seek'],
	args: false,
	usage: '!seek|skipto 100',
	guildOnly: true,
	async execute(message) {
		client = message.client;
		let guildQueue = client.player.getQueue(message.guild.id);
		guildQueue.seek(parseInt(args[`0`]) * 1000);
	},
};