const fetch = require('node-fetch');

module.exports = {
	name: 'joke',
	description: 'Generates a dad joke.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: false,
	execute(message) {
		fetch('https://icanhazdadjoke.com', { method: 'GET', headers: { Accept: 'application/json' } })
			.then(res => res.json())
			.then(json => {
				message.channel.send(json.joke);
				return;
			})
			.catch(e => {
				message.channel.send('Failed to deliver joke :sob:');
				return console.error(e);
			});
	},
};