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
            const args = [ 'queue'];
            const command = args.shift().toLowerCase();
            client.commands.get(command).execute(message);
		} catch(e){ console.log("Error shuffling Server Queue", e) }
	},
};