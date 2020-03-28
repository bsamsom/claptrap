const ytdl = require('ytdl-core-discord');

module.exports = {
	name: 'play',
	description: 'Play a song in your current voice channel.',
	aliases: [''],
	args: false,
	usage: '<url>',
	guildOnly: true,
	async execute(message) {
		const args = message.content.split(' ');
		const queue = message.client.queue;
		const serverQueue = message.client.queue.get(message.guild.id);

		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
			return message.channel.send('I need the permissions to join and speak in your voice channel!');
		}
		if (!args[1] && !serverQueue) {
			return message.channel.send('Missing Song URL');
		}

		const songInfo = await ytdl.getInfo(args[1]);
		const song = {
			title: songInfo.title,
			url: songInfo.video_url,
		};

		if (!serverQueue) {
			const queueContruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 5,
				playing: true,
			};

			queue.set(message.guild.id, queueContruct);

			queueContruct.songs.push(song);

			try {
				const connection = await voiceChannel.join();
				queueContruct.connection = connection;
				this.play(message, queueContruct.songs[0])
				.catch('error', error => {
					console.error("caught error: ", error);
				});
			}
			catch (err) {
				console.log(err);
				queue.delete(message.guild.id);
				return message.channel.send(err);
			}
		}
		else {
			serverQueue.songs.push(song);
			return message.channel.send(`${song.title} has been added to the queue!`);
		}
	},

	async play(message, song) {
		const queue = message.client.queue;
		const guild = message.guild;
		const serverQueue = queue.get(message.guild.id);
		if (!song) {
			serverQueue.voiceChannel.leave();
			queue.delete(guild.id);
			return;
		}

		//const dispatcher = serverQueue.connection.play(ytdl(song.url))
		//serverQueue.playing = true;
		const dispatcher = serverQueue.connection.play(await ytdl(song.url), { type: 'opus' })
		serverQueue.connection.dispatcher.on("end", () => {
			setTimeout(() => {
				console.log('Music ended!');
				serverQueue.songs.shift();
				this.play(message, serverQueue.songs[0])
				.catch('error', error => {
					console.error("caught error: ", error);
				}), 200
			})
		})
		.once("error", error => {
			console.error(error);
		})
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	},
};