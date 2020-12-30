const opus = require('@discordjs/opus');

module.exports = {
	name: 'play',
	description: 'Play a song in your current voice channel.',
	aliases: [''],
	args: false,
	usage: '<url>',
	guildOnly: true,
	async execute(message) {
		try {
			client = message.client;
			const args = message.content.split(' ');

			const voiceChannel = message.member.voice.channel;
			if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
			const permissions = voiceChannel.permissionsFor(message.client.user);
			if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
				return message.channel.send('I need the permissions to join and speak in your voice channel!');
			}
			if (!args[1]) {
				return message.channel.send('Missing Song URL');
			}

			let isPlaying = await client.player.isPlaying(message.guild.id);
			song_to_add = String(args[1]);
			console.log(song_to_add);
			// If there's already a song playing
			if(isPlaying){
				// Add the song to the queue
				let song = await client.player.addToQueue(message.guild.id, song_to_add);
				song = song.song;
				message.channel.send(`${song.name} has been added to the queue!`);
			} else {
				// Else, play the song
				let song = await client.player.play(voiceChannel, song_to_add);
				song = song.song;
				message.channel.send(`Started playing ${song.name}!`);
			}
		
		} catch(e){ console.log("error adding song:", e) }
	}
};