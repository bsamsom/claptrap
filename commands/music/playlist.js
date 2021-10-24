const opus = require('@discordjs/opus');
const Discord = require('discord.js');

module.exports = {
	name: 'playlist',
	description: 'Play a playlist of songs in your current voice channel.',
	aliases: [''],
	args: true,
	usage: '<url> <number of songs to add>(default is 20)',
	guildOnly: true,
	async execute(message) {
		client = message.client;
		const args = message.content.slice(config.prefix.length + 8).trim().split(/ +/g);
		console.log(args);
		let guildQueue = client.player.getQueue(message.guild.id);
		let queue = client.player.createQueue(message.guild.id);
		await queue.join(message.member.voice.channel);
		let song = await queue.playlist(args.join(' ')).catch(_ => {
			if(!guildQueue)
				queue.stop();
		});
	}
};