const Discord = require('discord.js')
const fs = require('fs')
const { prefix, token, guild_id, hubot_testing } = require('./config.json')
const client = new Discord.Client()

client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    client.user.setActivity("Youtube", {type: "WATCHING"})
    var d = new Date()

    // 3 is wednesday
    if(d.getDay() == 4){
        if(d.getHours() == 11 && d.getMinutes() == 3 && d.getSeconds() == 0){
            console.log(d.getDay() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds())
            guild = client.guilds.get(guild_id)
            channel = guild.channels.get(hubot_testing)
            args = [ 'schedule', 'next' ]
            const command = args.shift().toLowerCase()
            client.commands.get(command).execute(channel, args)
        }
    }
})

client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/)//whitespace
    args.push(client)
    const commandName = args.shift().toLowerCase()

    if (!client.commands.has(commandName)) return
    const command = client.commands.get(commandName)

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.args && args.length == 1) {
        let reply = `You didn't provide any arguments, ${message.author}!`

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
        }
        
		return message.channel.send(reply)
    }

    try {
        command.execute(message, args)
    } catch (error) {
        console.error(error)
        message.reply('there was an error trying to execute that command!')
    }
        

    messageContains(message)
})

function messageContains(message) {
    if(message.content.includes("food")){
        message.react("🥞")
    }
    if(message.content.includes("died") || message.content.includes("death") || message.content.includes("kill")){
        message.react("☠")
    }
}

client.login(token)