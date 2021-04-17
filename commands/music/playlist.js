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
		try {
			client = message.client;
			const args = message.content.split(' ');
			let playlistLength = 20;

			const voiceChannel = message.member.voice.channel;
			if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
			const permissions = voiceChannel.permissionsFor(message.client.user);
			if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
				return message.channel.send('I need the permissions to join and speak in your voice channel!');
			}
			if (!args[1]) {
				return message.channel.send('Missing Song URL');
			}
			if (args[2]) {
				playlistLength = args[2];
			}


			let isPlaying = await client.player.isPlaying(message);
			song_to_add = String(args[1]);
			console.log(song_to_add);
			// If there's already a song playing
          	//let song = await client.player.playlist(message, song_to_add, message.member.voice.channel, 100, message.author.tag);
			let song = await client.player.playlist(message, {
				search: song_to_add,
				requestedBy: message.author.tag,
				maxSongs: playlistLength
			});

		} catch(e){ console.log("error adding song:", e) }
	}
};