module.exports = {
	name: 'progressbar',
	description: 'shows a progressbar',
	aliases: ['progress', 'bar'],
	args: false,
	usage: '',
	guildOnly: true,
	async execute(message) {
		client = message.client;
		let guildQueue = client.player.getQueue(message.guild.id);
		const ProgressBar = guildQueue.createProgressBar();
		message.channel.send(ProgressBar);
	},
};