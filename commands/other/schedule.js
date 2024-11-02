const Table = require('easy-table');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const path = require('path');
const config = require(path.resolve(__dirname, '../../config/globals'));

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('schedule')
		.setDescription('Displays a schedule pulled from a google spreadsheet')
		.addStringOption(option =>
			option.setName('type')
				.setDescription('The schedule type')
				.setRequired(true)
				.addChoices(
					{ name: 'full', value: 'full' },
					{ name: 'upcoming', value: 'upcoming' },
					{ name: 'next', value: 'next' },
				)),
	async execute(interaction) {
		await interaction.reply({ content: 'Command received!', ephemeral: true });
		const channel = interaction.channel;
		const option = interaction.options.getString('type');
		processSchedule(option, channel);
	},
	processSchedule
}

async function processSchedule(option, channel){
	const SESSION_ONE_START 			= 0;
	const SESSION_ONE_END 				= 1;
	const SESSION_ONE_MISSING_PLAYERS 	= 2;
	const SESSION_TWO_START 			= 3;
	const SESSION_TWO_END 				= 4;
	const SESSION_TWO_MISSING_PLAYERS 	= 5;

	if(!config.GOOGLE_SPREADSHEET_ID){
		return channel.send("Missing Spreadsheet for pulling a schedule");
	}
	const doc = new GoogleSpreadsheet(config.GOOGLE_SPREADSHEET_ID);
	try {
		await doc.useServiceAccountAuth({
			client_email: config.GOOGLE_CLIENT_EMAIL,
			private_key: formatPrivateKey(config.GOOGLE_PRIVATE_KEY),
		});
		await doc.loadInfo(); // loads document properties and worksheets
		const sheet = doc.sheetsByIndex[0]; 
		const rows = await sheet.getRows();
		
		header1=rows[0]._sheet.headerValues[0];
		header2=rows[0]._sheet.headerValues[3];
		// console.log(header1, header2);
		const BreakException = {};
		var table = new Table;
		try {
			rows.forEach(row => {
				date1		= row._rawData[SESSION_ONE_START];
				date2		= row._rawData[SESSION_TWO_START];
				time1		= row._rawData[SESSION_ONE_END];
				time2		= row._rawData[SESSION_TWO_END];
				missing1	= row._rawData[SESSION_ONE_MISSING_PLAYERS];
				missing2	= row._rawData[SESSION_TWO_MISSING_PLAYERS];

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

				if (option == 'full') {
					// console.log("option full");
					table = setData(table, header1, session1_date, header2, session2_date, channel);
				}
				else if (option == 'upcoming') {
					// console.log("option upcoming");
					if (session1_date > Date.now() || session2_date > Date.now()) {
						table = setData(table, header1, session1_date, header2, session2_date, channel);
					}
				}
				else if (option == 'next') {
					// console.log("option next");
					if (session1_date > Date.now() || session2_date > Date.now()) {
						// console.log("test");
						//table = setData(datableta, header1, session1_date, header2, session2_date, channel);
						sendEmbed(table, header1, session1_date, missing1, header2, session2_date, missing2, channel);
						throw BreakException;
					}
				}
			});
		}
		catch (e) {
			if (e.length > 0){
				console.log("Error:", e)
			}
			// used to end early on next
		}
		if(table.toString().length > 10){
			console.log("table.toString().length", table.toString().length);
			channel.send('```' + table.toString() + '```');
		}
	} catch (e) {
		console.log("end", e)
		// Deal with the fact the chain failed
	}
}

function formatPrivateKey(privateKey) {
    const HEADER = '-----BEGIN PRIVATE KEY-----\n';
    const FOOTER = '\n-----END PRIVATE KEY-----\n';
    const LINE_LENGTH = 64;

	// Remove any existing headers/footers
    const cleanKey = privateKey
        .replace(/-----BEGIN PRIVATE KEY-----/g, '')
        .replace(/-----END PRIVATE KEY-----/g, '')
        .replace(/\s+/g, '');

    // Split the key into chunks of LINE_LENGTH
    const formattedKey = cleanKey.match(new RegExp('.{1,' + LINE_LENGTH + '}', 'g'));

    // Join the chunks with a newline
    const formattedKeyWithNewlines = formattedKey ? formattedKey.join('\n') : '';

	const formattedKeyWithNewlinesAndHeaders = HEADER + formattedKeyWithNewlines + FOOTER;

	return formattedKeyWithNewlinesAndHeaders;
}


function setData(table, header1, session1, header2, session2, channel) {
	time1 = session1.toLocaleTimeString();
	time2 = session2.toLocaleTimeString();
	if(time1 == '12:00:00 AM'){ time1 = "No Session"; };
	if(time2 == '12:00:00 AM'){ time2 = "No Session"; };
	//char limit 2,000
	var test1 = "" + session1.toDateString() + session1.toLocaleTimeString() + session2.toDateString() + session2.toLocaleTimeString();
	var test2 = `${header1}  Start Time  |  ${header2}  Start Time `;
	var max = 0;
	if(test1 > max); max = test1.length;
	if(test2 > max); max = test2.length;
	if(table.toString().length + max > 1900){
		channel.send('```' + table.toString() + '```');
		table = new Table;
	}

	name1 = header1.split(' ');
	name2 = header2.split(' ');
	table.cell(`${header1}`, session1.toDateString());
	table.cell(`${name1[0]} Start Time`, time1);
	table.cell('|', '|');
	table.cell(`${header2}`, session2.toDateString());
	table.cell(`${name2[0]} Start Time`, time2);
	table.newRow();	
	return table;
}
function sendEmbed(table, header1, session1, missing1, header2, session2, missing2, channel) {
	wpgtime1 = session1.toLocaleTimeString();
	wpgtime2 = session2.toLocaleTimeString();
	detime1 = session1.toLocaleTimeString('en-US', { timeZone: 'Europe/Berlin' });
	detime2 = session2.toLocaleTimeString('en-US', { timeZone: 'Europe/Berlin' });
	if(wpgtime1 == '12:00:00 AM'){ 
		wpgtime1 = "No Session";
		detime1 = "No Session";
	};
	if(wpgtime2 == '12:00:00 AM'){ 
		wpgtime2 = "No Session";
		detime2 = "No Session";
	};

	name1 = header1.split(' ');
	name2 = header2.split(' ');

	if (!missing1){
		missing1 = "None"
	}
	if (!missing2){
		missing2 = "None"
	}
	// console.log(missing1, missing2)

	const embed = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle('DND schedule')
		//.setURL('https://discord.js.org/')
		//.setAuthor('Some name', 'https://i.imgur.com/AfFp7pu.png', 'https://discord.js.org')
		//.setDescription('Some description here')
		//.setThumbnail('https://i.imgur.com/AfFp7pu.png')
		.addFields(
			// Brent
			{ name: header1				, value: session1.toDateString(), inline: true },
			{ name: `Start Time(CA)`	, value: wpgtime1				, inline: true },
			{ name: `Start Time(DE)`	, value: detime1				, inline: true },
			{ name: `Missing Players`	, value: missing1				, inline: true  },
			// line break
			{ name: '\u200B', value: '\u200B', inline: false },
			// Anil
			{ name: header2				, value: session2.toDateString(), inline: true },
			{ name: `Start Time(CA)`	, value: wpgtime2				, inline: true },
			{ name: `Start Time(DE)`	, value: detime2				, inline: true },
			{ name: `Missing Players`	, value: missing2				, inline: true },
		)
		//.addField('Inline field title', 'Some value here', true)
		//.setImage('https://i.imgur.com/AfFp7pu.png')
		//.setTimestamp()
		//.setFooter('DND schedule', 'https://i.imgur.com/AfFp7pu.png');
	channel.send({ embeds: [embed] });

}