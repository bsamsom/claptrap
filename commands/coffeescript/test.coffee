	
execute = (message) ->
	message.channel.send("Hello World!, from Coffeescript!");

module.exports = { 
	name: 'test',
	description: 'coffeescript code example',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	execute
}