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
		try {
			client = message.client;
			ssearch = String(message.content);
			const regex = /!play /i;
			//console.log("before replace",ssearch);
			ssearch = ssearch.replace(regex, '');		
			//console.log("after replace",ssearch);
			
			const args = message.content.split(' ');

			const voiceChannel = message.member.voice.channel;
			if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
			const permissions = voiceChannel.permissionsFor(message.client.user);
			if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
				return message.channel.send('I need the permissions to join and speak in your voice channel!');
			}
			if (!args[1]) {
				let isPlaying = client.player.isPlaying(message);
				if(isPlaying){
					let song = await client.player.resume(message);
					return message.channel.send(`${song.name} was resumed!`); 
				}
				else{ 
					return message.channel.send('Missing Song URL'); 
				}
			}

			if(args.length <= 2){ song_to_add = String(args[1]); }
			else{ song_to_add = ssearch; }

			if(song_to_add.includes('spotify.com/playlist')) { 
				// user requests a spotify playlist not a song.
				// note youtube playlist are fine, spotify cause:	
				/* node:internal/process/promises:245
						triggerUncaughtException(err, true  fromPromise );
				Error [ERR_UNHANDLED_ERROR]: Unhandled error. ('SearchIsNull')
					at new NodeError (node:internal/errors:329:5)
					at Player.emit (node:events:367:17)
					at Player.play (C:\Users\ben samsom\Documents\claptrap\node_modules\discord-music-player\src\Player.js:112:18)
					at processTicksAndRejections (node:internal/process/task_queues:94:5) {
				code: 'ERR_UNHANDLED_ERROR',
				context: 'SearchIsNull'
				} */
				command = "```" + `${config.prefix}playlist ${song_to_add}` + "```"
				return message.channel.send(`This is a playlist not a song, try ${command}`);  
			}

			console.log(song_to_add);
			// If there's already a song playing
			let song = '';

			client.player.isPlaying(message) ?
				song = client.player.addToQueue(message, song_to_add, {}, message.author.tag) :
				song = client.player.play(message, song_to_add, {}, message.author.tag);
			if(!song) return message.channel.send('Song not found (probably a bug?)');

		} catch(e){ console.log("error adding song(2):", e) }
	}
};