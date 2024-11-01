const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('insult')
		.setDescription('Generates an insult.'),
	async execute(interaction) {
		fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
			.then(res => res.json())
			.then(json => {
				interaction.reply(json.insult);
				return;
			})
			.catch(e => {
				const channel = interaction.channel;
				channel.send('Failed to deliver insult :sob:');
				return console.error(e);
			});
	},
}