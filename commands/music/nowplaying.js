module.exports = {
	name: 'nowplaying',
	description: 'Get the current song that is playing.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	async execute(message) {
		client = message.client;
		let guildQueue = client.player.getQueue(message.guild.id);
		guildQueue.setPaused(true);
		message.channel.send(`Now playing: ${guildQueue.nowPlaying}`);
	},
};