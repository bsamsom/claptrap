module.exports = {
	name: 'progressbar',
	description: 'shows a progressbar',
	aliases: ['progress', 'bar'],
	args: false,
	usage: '',
	guildOnly: true,
	async execute(message) {
		try{
			client = message.client;
            let progressBar = client.player.createProgressBar(message.guild.id, 20);
			message.channel.send(progressBar);
		} catch(e){ console.log("error showing progressBar:", e) }
	},
};