const { prefix } = require('../../config.json');
Table = require('easy-table')
module.exports = {
	name: 'help',
	description: 'Lists all commands on this bot, or info about a specific command.',
	aliases: ['commands'],
    usage: '<command>',
    guildOnly: false,
	execute(message, args) {
        const { commands } = message.client;
        t = new Table
        commands.sort((a, b) => {
            if ( a.name > b.name ) return -1
            if ( a.name < b.name ) return 1
            return 0
        })

        const sortedCommands = new Map([...commands.entries()].sort());
        //console.log(mapAsc)

        sortedCommands.forEach(element => {
            t.cell("Name", prefix + element.name + " " + element.usage)
            t.cell("Description", element.description)
            if (element.aliases != ""){
                t.cell("Aliases", prefix + element.aliases)
            }
            else{
                t.cell("Aliases", element.aliases)
            }
            t.cell("Server Only", element.guildOnly)
            t.newRow()
        });
        //console.log(t.toString())
        message.channel.send("```" + t.toString() + "```")
	},
}