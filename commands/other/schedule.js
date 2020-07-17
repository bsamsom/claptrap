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
				var data = new Table;
				try {
					rows.forEach(row => {
						const brent = new Date(row.brentscampaign);
						const anil 	= new Date(row.anilscampaign);
						var b 		= days[brent.getDay()] + ' ' + months[brent.getMonth()] + ' ' + brent.getDate();
						var a 		= days[anil.getDay()] + ' ' + months[anil.getMonth()] + ' ' + anil.getDate();
						var btime 	= row._cokwr;
						var atime 	= row._cre1l;

						if( brent == "Invalid Date"){
							b 		= "No Session"
							btime 	= "No Session"
						}
						if( anil == "Invalid Date"){
							a 		= "No Session"
							atime 	= "No Session"
						}

						if (args[0] == 'full') {
							data = setData(data, b, btime, a, atime, channel);
						}
						else if (args[0] == 'upcoming') {
							if (brent > Date.now() || anil > Date.now()) {
								data = setData(data, b, btime, a, atime, channel);
							}
						}
						else if (args[0] == 'next') {
							if (brent > Date.now() || anil > Date.now()) {
								data = setData(data, b, btime, a, atime, channel);
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

function setData(data, bday, btime, aday, atime, channel) {
	//char limit 2,000
	var test1 = "" + bday + btime + aday + atime;
	var test2 = "Brents D&D Campaign  Brents Start Time  |  Anils D&D Campaign  Anils Start Time ";
	var max = 0;
	if(test1 > max); max = test1.length;
	if(test2 > max); max = test2.length;
	//console.log("max", max);
	if(data.toString().length + max > 1900){
		//channel.send('```' + temp.toString() + '```');
		//console.log("temp", data.toString().length + max);
		channel.send('```' + data.toString() + '```');
		data = new Table;
	}

	data.cell('Brents D&D Campaign', bday);
	data.cell('Brents Start Time', btime);
	data.cell('|', '|');
	data.cell('Anils D&D Campaign', aday);
	data.cell('Anils Start Time', atime);
	data.newRow();	
	return data;
}