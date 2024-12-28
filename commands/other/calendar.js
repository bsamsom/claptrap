const ical = require('node-ical');
const Table = require('easy-table');
const moment = require('moment');

const path = require('path');
const config = require(path.resolve(__dirname, '../../config/globals'));

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('calendar')
		.setDescription('Displays bens on-call calendar.'),
	async execute(interaction) {
		var table = new Table;
        const events = await ical.async.fromURL(config.CALENDAR);
        for (const event of Object.values(events)) {
            if (event.summary){
                var summary     = event.summary.replace('Shift as ', '');
                summary         = summary.replace(' at Engineering Apps', '');
                var startDate   =  moment(event.start.toISOString());
                var endDate     =  moment(event.end.toISOString());

                if (endDate.isAfter(moment())) {
                    table.cell('Start',    startDate.format('ddd MMM-DD h A'));
                    table.cell('End',      endDate.format('ddd MMM-DD h A'));
                    table.cell('Shift',    summary);
                    table.newRow();	
                }
            }
        };
        interaction.reply('```' + table.toString() + '```');
	},
}