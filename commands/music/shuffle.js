module.exports = {
	name: 'shuffle',
	description: 'shuffels the music queue',
	aliases: ['random'],
	args: false,
	usage: '',
	guildOnly: true,
	async execute(message) {
		client = message.client;
		let guildQueue = client.player.getQueue(message.guild.id);
		guildQueue.shuffle();
	},
};