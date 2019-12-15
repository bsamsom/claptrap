Table = require('easy-table')
module.exports = {
    name: 'servers',
    description: 'Lists all the channels on the connected server.',
    aliases: [''],
    args: false,
    usage: '',
    guildOnly: true,
    execute(message, args) {   
        client = args[0]
        t = new Table
        client.guilds.forEach((guild) => {
            guild.channels.forEach((channel) => { 
                if(channel.permissionsFor(message.author).has('VIEW_CHANNEL')){
                    t.cell("Channels", channel.name)
                    t.cell("Types", channel.type)
                    t.cell("IDS", channel.id)
                    t.newRow()
                }
            })
            message.channel.send("Server: " + guild.name + "\n" + "```" + t.toString() + "```")
        })
    }
}