const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Used to determine if the bot is online.'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
}