const { prefix } = require('../../config.json');
const Table = require('easy-table');
module.exports = {
	name: 'help',
	description: 'Lists all commands on this bot',
	aliases: ['commands'],
	args: false,
	usage: '<command>',
	guildOnly: false,
	execute(message, args) {
		const { commands } = message.client;
		//console.log(args)
		//console.log(args.length);
		const sortedCommands = new Map([...commands.entries()].sort());
		
		let t = new Table;
		if (args.length > 1) {
			if(sortedCommands.get(args[0])){
				command = sortedCommands.get(args[0]);
				t.cell('Name:', prefix + command.name);
				t.cell('Useage:', command.usage);
				t.cell('Description:', command.description);
				if (command.aliases != '') {
					t.cell('Aliases:', prefix + command.aliases);
				}
				else{
					t.cell('Aliases:', command.aliases);
				}
				t.cell('Server:', command.guildOnly);
				t.newRow();
				message.channel.send('```' + t.printTransposed() + '```');
			}
			else return message.channel.send('There is no command by that name');
		}
		else {
			commands.sort((a, b) => {
				if (a.name > b.name) return -1;
				if (a.name < b.name) return 1;
				return 0;
			});

			// console.log(mapAsc)
			i = 1;

			sortedCommands.forEach(element => {
				t.cell('Name:', prefix + element.name + ' ' + element.usage);
				t.cell('Description:', element.description);
				// if help exceeds 2,000 chqars might need to break it up again.
				/*
				if (element.aliases != '') {
					t.cell('Aliases:', prefix + element.aliases);
				}
				else{
					t.cell('Aliases:', element.aliases);
				}
				t.cell('Server:', element.guildOnly);
				t.newRow();
				*/
				if(i == 15) {
					message.channel.send('```' + t.toString() + '```');
					t = new Table;
					i = -1;
				}
				else{
					t.newRow();
				}
				
				i++;
				
			});
			message.channel.send('```' + t.toString() + '```');
		}
	},
};