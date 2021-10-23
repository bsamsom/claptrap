const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
	name: 'insult',
	description: 'Generates an insult.',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: false,
	execute(message) {
		fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
			.then(res => res.json())
			.then(json => {
				message.channel.send(json.insult);
				return;
			})
			.catch(e => {
				message.channel.send('Failed to deliver insult :sob:');
				return console.error(e);
			});
	},
};