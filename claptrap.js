const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');

const path = require('path');
const config = require(path.resolve(__dirname, './config/globals'));
const crons = require(path.resolve(__dirname, './helpers/crons'));

const client = new Client({
	restRequestTimeout: 30000,
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		//GatewayIntentBits.MESSAGE_CREATE,
		//GatewayIntentBits.VIEW_CHANNEL,
		GatewayIntentBits.GuildPresences,
		//GatewayIntentBits.DIRECT_MESSAGES,
		GatewayIntentBits.GuildVoiceStates,
	] 
});
require("coffeescript/register");

client.commands = new Collection();

client.once(Events.ClientReady, () => {
	client.user.setUsername("Claptrap");
	console.log('Connected as ' + client.user.tag);
	client.user.setActivity('The Echonet', { GOOGLE_TYPE: 'WATCHING' });
	//const guild = client.guilds.cache.get(config.DISCORD_GUILD_ID);
	//const channel = guild.channels.cache.get(config.DISCORD_HUBOT_TESTING);
	//channel.send(val);

});

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

//load cron jobs
crons.loadcrons(client);

client.on('guildMemberAdd', member => {
	// change this to the channel you want to send the greeting to
	const channel = member.guild.channels.find(c => c.name === 'general');
	if (!channel) return;
	channel.send(`Welcome ${member}!`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(config.DISCORD_TOKEN);

process.on("unhandledRejection", error => 
	console.error("Promise rejection:", error)
);