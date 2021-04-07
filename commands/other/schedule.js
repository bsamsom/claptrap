const creds = require('../../client_secret.json');
const config = require('../../config.json');
const Table = require('easy-table');

const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = {
	name: 'schedule',
	description: 'Displays a schedule pulled from a google spreadsheet',
	aliases: [''],
	args: true,
	usage: '<full|upcoming|next>',
	guildOnly: false,
	async execute(message, args) {
		let channel = '';
		if(message.channel) {
			channel = message.channel;
		}
		else{
			channel = message;
		}
		if(!config.SPREADSHEET_ID){
			return message.channel.send("Missing Spreadsheet for pulling a schedule");
		}
		const doc = new GoogleSpreadsheet(config.SPREADSHEET_ID);
		try {
			await doc.useServiceAccountAuth({
				client_email: creds.client_email,
				private_key: creds.private_key,
			});
			await doc.loadInfo(); // loads document properties and worksheets
			const sheet = doc.sheetsByIndex[0]; 
			const rows = await sheet.getRows();
			
			header1=rows[0]._sheet.headerValues[0];
			header2=rows[0]._sheet.headerValues[2];
			//console.log(header1, header2);
			const BreakException = {};
			var data = new Table;
			try {
				rows.forEach(row => {
					date1= row._rawData[0];
					date2= row._rawData[2];
					time1= row._rawData[1];
					time2= row._rawData[3];

					time1split = time1.split(":");// hours/mins
					session1_date = new Date(date1);
					if (time1split.length == 2){
						session1_date.setHours(time1split[0]);//hours
						session1_date.setMinutes(time1split[1]);//minutes
					}

					time2split = time2.split(":");// hours/mins
					session2_date = new Date(date2);
					if (time2split.length == 2){
						session2_date.setHours(time2split[0]);//hours
						session2_date.setMinutes(time2split[1]);//minutes
					}	

					if (args[0] == 'full') {
						data = setData(data, header1, session1_date, header2, session2_date, channel);
					}
					else if (args[0] == 'upcoming') {
						if (session1_date > Date.now() || session2_date > Date.now()) {
							data = setData(data, header1, session1_date, header2, session2_date, channel);
						}
					}
					else if (args[0] == 'next') {
						if (session1_date > Date.now() || session2_date > Date.now()) {
							data = setData(data, header1, session1_date, header2, session2_date, channel);
							throw BreakException;
						}
					}
				});
			}
			catch (e) {
				// used to end early on next
			}
			channel.send('```' + data.toString() + '```');
		} catch (e) {
			console.log(e.Error)
			// Deal with the fact the chain failed
		}
	},
};

function setData(data, header1, session1, header2, session2, channel) {
	time1 = session1.toLocaleTimeString();
	time2 = session2.toLocaleTimeString();
	if(time1 == '12:00:00 a.m.'){ time1 = "No Session"; };
	if(time2 == '12:00:00 a.m.'){ time2 = "No Session"; };
	//char limit 2,000
	var test1 = "" + session1.toDateString() + session1.toLocaleTimeString() + session2.toDateString() + session2.toLocaleTimeString();
	var test2 = `${header1}  Start Time  |  ${header2}  Start Time `;
	var max = 0;
	if(test1 > max); max = test1.length;
	if(test2 > max); max = test2.length;
	if(data.toString().length + max > 1900){
		channel.send('```' + data.toString() + '```');
		data = new Table;
	}

	name1 = header1.split(' ');
	name2 = header2.split(' ');
	data.cell(`${header1}`, session1.toDateString());
	data.cell(`${name1[0]} Start Time`, time1);
	data.cell('|', '|');
	data.cell(`${header2}`, session2.toDateString());
	data.cell(`${name2[0]} Start Time`, time2);
	data.newRow();	
	return data;
}