const opus = require('@discordjs/opus');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
	name: 'play',
	description: 'Play a song in your current voice channel(youtube/spotify).',
	aliases: [''],
	args: false,
	usage: '<url>',
	guildOnly: true,
	async execute(message) {
		client = message.client;
		const args = message.content.slice(config.prefix.length + 4).trim().split(/ +/g);
		console.log(args);
		let guildQueue = client.player.getQueue(message.guild.id);
		let queue = client.player.createQueue(message.guild.id);
		await queue.join(message.member.voice.channel);
		let song = await queue.play(args.join(' ')).catch(_ => {
			if(!guildQueue)
				queue.stop();
		});
	}
};