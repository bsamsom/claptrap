const fetch = require('node-fetch');

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
		fetch(`http://names.drycodes.com/${number}?nameOptions=${gender}_names&separator=space&combine=${combine}`)
			.then(res => res.json())
			.then(json => {
				message.channel.send(json);
				return;
			})
			.catch(e => {
				message.channel.send('Failed to deliver random name :sob:');
				return console.error(e);
			});
	},
};