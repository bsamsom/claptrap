module.exports = {
	name: 'stop',
	description: 'Stop all songs in the queue.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	execute(message) {
		try{
			client = message.client;
			client.player.stop(message);
			message.channel.send('Music stopped, the Queue was cleared!');
		} catch(e){ console.log("error stopping song:", e) }
	},
};