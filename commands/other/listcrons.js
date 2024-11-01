const cron = require('../../helpers/crons');
const Table = require('easy-table');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('listcrons')
		.setDescription('Used to list upcoming cron jobs'),
	async execute(interaction) {
        data = new Table;
		process.env.TZ = 'America/Winnipeg';
        cron.cronJobs.forEach(cronjob => {
            time = new Date(cronjob.cron.nextDates(1));
            data.cell('Cron Name', cronjob.name);
            data.cell('Next Run Time', time.toLocaleString('en-US'));
            data.newRow();	
        });
        interaction.reply('```' + data.toString() + '```');
	},
}