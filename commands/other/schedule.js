const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('../../client_secret.json');
const env = require('../../config.json');
const Table = require('easy-table');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
const doc = new GoogleSpreadsheet(env.SPREADSHEET_ID);

module.exports = {
	name: 'schedule',
	description: 'Displays the D&D schedule.',
	aliases: [''],
	args: true,
	usage: '<full|upcoming|next>',
	guildOnly: false,
	execute(message, args) {
		let channel = '';
		if(message.channel) {
			channel = message.channel;
		}
		else{
			channel = message;
		}
		// Authenticate with the Google Spreadsheets API.
		doc.useServiceAccountAuth(creds, function() {
			// Get all of the rows from the spreadsheet.
			const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			doc.getRows(1, function(err, rows) {
				const BreakException = {};
				const data = new Table;
				try {
					rows.forEach(row => {
						const brent = new Date(row.brentscampaign);
						const anil = new Date(row.anilscampaign);
						const b = days[brent.getDay()] + ' ' + months[brent.getMonth()] + ' ' + brent.getDate();
						const a = days[anil.getDay()] + ' ' + months[anil.getMonth()] + ' ' + anil.getDate();

						if (args[0] == 'full') {
							setData(data, b, row._cokwr, a, row. _cre1l);
						}
						else if (args[0] == 'upcoming') {
							if (brent > Date.now() || anil > Date.now()) {
								setData(data, b, row._cokwr, a, row. _cre1l);
							}
						}
						else if (args[0] == 'next') {
							if (brent > Date.now() || anil > Date.now()) {
								setData(data, b, row._cokwr, a, row. _cre1l);
								throw BreakException;
							}
						}
					});
				}
				catch (e) {
					// used to end early on next
				}
				channel.send('```' + data.toString() + '```');
			});
		});
	},
};

function setData(data, bday, btime, aday, atime) {
	data.cell('Brents D&D Campaign', bday);
	data.cell('Brents Start Time', btime);
	data.cell('Anils D&D Campaign', aday);
	data.cell('Anils Start Time', atime);
	data.newRow();
}