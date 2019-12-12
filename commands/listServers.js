module.exports = {
    name: 'listservers',
    description: 'listservers',
    args: false,
    usage: '',
    guildOnly: true,
    execute(message, args) {
        console.log("Servers:")// List servers the bot is connected to
        client = args[0]
        client.guilds.forEach((guild) => {
            console.log(" - " + guild.name + " " + guild.id)// List all channels of each server
            guild.channels.forEach((channel) => {
                console.log(`\t${channel.name} (${channel.type}) - ${channel.id}`)
            })
        })
        
    }
}