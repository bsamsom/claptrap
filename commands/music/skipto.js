module.exports = {
	name: 'skipto',
	description: 'jumps to requested position in song',
	aliases: ['seek'],
	args: false,
	usage: '',
	guildOnly: true,
	async execute(message) {
		try{
			client = message.client;
            let song = await client.player.seek(message.guild.id, parseInt(message.args[1] * 1000));
            message.channel.send(`Seeked to ${message.args[1]} second of ${song.song.name}.`);
		} catch(e){ console.log("error moving to requested duration", e) }
	},
};