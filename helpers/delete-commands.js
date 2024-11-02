require('dotenv').config();

const { REST, Routes } = require('discord.js');
const path = require('node:path');

const config = require(path.resolve(__dirname, '../config/globals'));

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(config.DISCORD_TOKEN);

// for guild-based commands

rest.put(Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, config.DISCORD_GUILD_ID), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(config.DISCORD_CLIENT_ID), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);