module.exports = {
	name: 'skipto',
	description: 'jumps to requested position in song',
	aliases: ['seek'],
	args: false,
	usage: '!seek|skipto 100',
	guildOnly: true,
	async execute(message) {
        const args = message.content.split(' ');
		try{
			client = message.client;
            let song = await client.player.seek(message.guild.id, parseInt(args[1] * 1000));
            message.channel.send(`Moved to ${args[1]} second of ${song.song.name}.`);
		} catch(e){ console.log(`Error moving to  ${args[1]}`, e) }
	},
};