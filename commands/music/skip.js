module.exports = {
	name: 'skip',
	description: 'Skip the current song.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	async execute(message) {
		try{
			client = message.client;
			let song = await client.player.skip(message);
			message.channel.send(`${song.name} was skipped!`);
		} catch(e){ console.log("error skipping song:", e) }
	},
};