const cron = require('../.././crons');
const Table = require('easy-table');
module.exports = {
	name: 'listcrons',
	description: 'Used to list upcoming cron jobs',
	aliases: ['crons'],
	args: false,
	usage: '',
	guildOnly: false,
	execute(message) {
        if(message.channel) {
			channel = message.channel;
		}
		else{
			channel = message;
		}
        data = new Table;
		process.env.TZ = 'America/Winnipeg';
        cron.cronJobs.forEach(cronjob => {
            time = new Date(cronjob.cron.nextDates(1));
            data.cell('Cron Name', cronjob.name);
            data.cell('Next Run Time', time.toLocaleString('en-US'));
            data.newRow();	
        });
        channel.send('```' + data.toString() + '```');
	},
}
