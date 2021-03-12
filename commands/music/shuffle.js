module.exports = {
	name: 'shuffle',
	description: 'shuffels the music queue',
	aliases: ['random'],
	args: false,
	usage: '',
	guildOnly: true,
	async execute(message) {
		try{
			client = message.client;
            client.player.shuffle(message.guild.id);
            message.channel.send('Server Queue was shuffled.');
		} catch(e){ console.log("error shuffling Server Queue", e) }
	},
};