module.exports = {
	name: 'resume',
	description: 'Resumes the paused song.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	async execute(message) {
		try{
			client = message.client;
			let song = await client.player.resume(message);
			message.channel.send(`${song.name} was resumed!`);
		} catch(e){ console.log("error resuming song:", e) }
	},
};
