const { readdirSync } = require('fs');
const { join } = require('path');
module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	aliases: [''],
	args: true,
	usage: '<command>',
	guildOnly: true,
	execute(message, args) {
		const bot = args[args.length - 1];

		if (args.length == 1) return message.channel.send('Please provide a command to reload!');
		const commandName = args[0].toLowerCase();
		const command = bot.commands.get(commandName) || bot.commands.get(bot.aliases.get(commandName));
		if (!command) return message.channel.send('That command doesn\'t exist. Try again.');
		readdirSync(join(__dirname, '..')).forEach(f => {
			const files = readdirSync(join(__dirname, '..', f));
			if (files.includes(`${commandName}.js`)) {
				const file = `../${f}/${commandName}.js`;
				try {
					delete require.cache[require.resolve(file)];
					delete require.cache[require.resolve('../server/help.js')];
					bot.commands.delete(commandName);
					bot.commands.delete('help');
					const pull = require(file);
					const pull2 = require('../server/help.js');
					bot.commands.set(commandName, pull);
					bot.commands.set('help', pull2);
					return message.channel.send(`Successfully reloaded ${commandName}.js!`);
				}
				catch (err) {
					message.channel.send(`Could not reload: ${args[0].toUpperCase()}\``);
					return console.log(err.stack || err);
				}
			}
		});
	},
};