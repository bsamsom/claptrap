	
execute = (message) ->
	message.channel.send("hello from coffeescript");

module.exports = { 
	name: 'test',
	description: 'coffeescript code example',
	aliases: [''],
	args: false,
	usage: '',
	guildOnly: true,
	execute
}