const opus = require('@discordjs/opus');
const Discord = require('discord.js');

module.exports = {
	name: 'playlist',
	description: 'Play a playlist of songs in your current voice channel.',
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
            const { playlist, song } = await client.player.playlist(message.guild.id, song_to_add, message.member.voice.channel, 100, message.author.tag);
            console.log("playlist", playlist);
            console.log("song", song);
            if(song){
                return message.channel.send(
                    exampleEmbed = new Discord.MessageEmbed()
                    .setTitle(song.name)
                    .setDescription(`Author: ${song.author}\nDuration: ${song.duration}\nRequested by: ${song.requestedBy}`)
                    .addField('Added PlayList',`Songs: ${playlist.playlistSongs.length}`)
                    .setURL(playlist.link)
                )
            }else{
                return message.channel.send(
                    exampleEmbed = new Discord.MessageEmbed()
                    .setTitle('Added PlayList!')
                    .setDescription(`Songs: ${playlist.playlistSongs.length}`)
                    .setURL(playlist.link)
                )
            }

		} catch(e){ console.log("error adding song:", e) }
	}
};