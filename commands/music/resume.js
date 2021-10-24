module.exports = {
	name: 'resume',
	description: 'Resumes the paused song.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	async execute(message) {
		client = message.client;
		let guildQueue = client.player.getQueue(message.guild.id);
		guildQueue.setPaused(false);
	},
};
