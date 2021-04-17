module.exports = {
	name: 'nowplaying',
	description: 'Get the current song that is playing.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	async execute(message) {
		try{
			client = message.client;
			let song = await client.player.nowPlaying(message);
			message.channel.send(`${song.name} is currently playing!`);
		} catch(e){ console.log("error listing playing song:", e) }
	},
};