const discord = require('discord.js');
const fs = require('fs');
const { sep } = require('path');
const { prefix, token, guild_id, hubot_testing, dungeons_and_dragons, bot_id } = require('./config.json');
const { Player } = require("discord-music-player");
var exec = require('child_process').execFile;
const crons = require('./crons');
const path = require('path');
const client = new discord.Client();
require("coffeescript/register");

client.commands = new discord.Collection();
const player = new Player(client, {
	leaveOnEmpty: true, // This options are optional.
	leaveOnEnd: true,
	quality: 'high'
});
client.player = player;

client.on('ready', () => {
	client.user.setUsername("Claptrap");
	console.log('Connected as ' + client.user.tag);
	client.user.setActivity('The Echonet', { type: 'WATCHING' });
	//const guild = client.guilds.cache.get(guild_id);
	//const channel = guild.channels.cache.get(hubot_testing);
	//channel.send(val);

});

//adding songs to queue 
client.player.on('songAdd',  (message, queue, song) =>
    message.channel.send(`**${song.name}** has been added to the queue!`))
    .on('songFirst',  (message, song) =>
    	message.channel.send(`**${song.name}** is now playing!`));
//adding playlist
client.player
	.on('playlistAdd',  (message, queue, playlist) => 
		message.channel.send(`${playlist.name} playlist with ${playlist.videoCount} songs has been added to the queue!`));
	

const load = (dir = './commands/') => {
	fs.readdirSync(dir).forEach(dirs => {
		const commands = fs.readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files => files.endsWith('.js') || files.endsWith('.coffee'));
		for (const file of commands) {
		// We make a pull to that file so we can add it the bot.commands collection
			const pull = require(`${dir}/${dirs}/${file}`);
			//console.log(pull.name, pull)
			client.commands.set(pull.name, pull);
		}
	});
};

// we call the function to all the commands.
load();
//load cron jobs
crons.loadcrons(client);

client.on('guildMemberAdd', member => {
	// change this to the channel you want to send the greeting to
	const channel = member.guild.channels.find(c => c.name === 'general');
	if (!channel) return;
	channel.send(`Welcome ${member}!`);
});

client.on('message', (message) => {
	//messageContains(message);

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// whitespace
	const args = message.content.slice(prefix.length).split(/ +/);
	args.push(client);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) {
		GO_DIR = process.env.GO_DIR || `commands/go`;
		var p = GO_DIR + "/" + commandName;
		if(checkFileExistsSync(p)){
			//file exists do something.
			exec(p, function(err, data) {  
				if(err){
					message.reply('there was an error trying to execute that command!');
				}
				else{
					message.channel.send(data.toString());
				}                    
			});  
		}
		else{
			return;
		}
	}
	else {
		if (command.guildOnly && message.channel.type !== 'text') {
			return message.reply('I can\'t execute that command inside DMs!');
		}
	
		if (command.args && args.length == 1) {
			let reply = `You didn't provide any arguments, ${message.author}!`;
	
			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}
	
			return message.channel.send(reply);
		}
	
		try {
			command.execute(message, args);
		}
		catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
		}
	}
});

function messageContains(message) {
	if(message.content.includes('food')) {
		message.react('🥞');
	}
	if(includes(message, 'died') || includes(message, 'death') || includes(message, 'kill') || includes(message, 'die')) {
		message.react('☠');
	}
	if(includes(message, '?')) { message.react('⁉️'); }
	
}
function includes(message, val) {return message.content.includes(val);}

function checkFileExistsSync(filepath){
	let flag = true;
	try{
	  fs.accessSync(filepath, fs.constants.F_OK);
	}catch(e){
	  flag = false;
	}
	return flag;
  }

client.login(token);
