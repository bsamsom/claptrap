const { CommandInteractionOptionResolver } = require('discord.js');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
	name: 'name',
	description: 'Generates a set of random names.',
	aliases: ['names'],
	args: true,
	usage: '<boy|girl> <# of names>',
	guildOnly: false,
	execute(message, args) {
		var gender = args[0];
		var number = 3;
		var combine = 2;
		if(args[0].toLowerCase() == "boy")
			gender = "boy";
		else if(args[0].toLowerCase() == "girl")
			gender = "girl";
		if(args.length == 3){
			number = args[1];
		}

		//visit http://names.drycodes.com/ for more info
		var url = `http://names.drycodes.com/${number}?nameOptions=${gender}_names&separator=space&combine=${combine}`;
		console.log("url", url);
		fetch(url, {
			method: 'GET',
			headers: { 
				Accept: 'application/json' 
			}
		 })
		.then(res => res.json())
		.then(res => {
			// as of discordjs cant post an array, needs to be a string.
			message.channel.send(res.toString());
			return;
		})
		.catch(e => {
			message.channel.send('Failed to deliver random name :sob:');
			return console.error(e);
		});
	},
};