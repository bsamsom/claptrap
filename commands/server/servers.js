const Table = require('easy-table');
const { Permissions } = require('discord.js');
module.exports = {
	name: 'servers',
	description: 'Lists all the channels on the connected server.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	execute(message, args) {
		const client = args[0];
		const t = new Table;
		message.guild.channels.fetch()
		.then(channels => {
			channels.forEach((channel) => {
				if(message.member.permissionsIn(channel).has('VIEW_CHANNEL')) {
					t.cell('Channels', channel.name);
					t.cell('Types', channel.type);
					t.cell('IDS', channel.id);
					t.newRow();
				}
			});
			//console.log('```' + t.toString() + '```')
			t.sort(['Types'])
			message.channel.send('```' + t.toString() + '```');
		});
	},
};