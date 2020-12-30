module.exports = {
	name: 'pause',
	description: 'Pauses the current song.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	async execute(message) {
		try{
			client = message.client;
			let song = await client.player.pause(message.guild.id);
			message.channel.send(`${song.name} was paused!`);
		} catch(e){ console.log("error pausing song:", e) }
	},
};