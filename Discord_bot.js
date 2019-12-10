const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    //set the bot to `playing With JavaScript` 
    //client.user.setActivity("With JavaScript")
    //Set the bot to watching youtube
    client.user.setActivity("Youtube", {type: "WATCHING"})

    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
         // List all channels
         guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
})


client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
    }


    if(receivedMessage.content.includes("food") == true){
        //const webAttachment = new Discord.Attachment('https://gph.is/YBDKK8')
        //const localFileAttachment = new Discord.Attachment('C:\\Users\\Benjamin Samsom\\Downloads\\pics\\57b7fada069d3a1ebd3a3c5dd7bb20ad.png')
        //receivedMessage.channel.send(localFileAttachment)
        receivedMessage.react("🥞")
    }


    //receivedMessage.channel.send("Message received: " + receivedMessage.content)
    // Tag the user
    //receivedMessage.channel.send("Message received from " + receivedMessage.author.toString() + ": " + receivedMessage.content)
    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    }else {
        receivedMessage.channel.send("I don't understand the command. Try `!help`")
    }
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("It looks like you might need help with " + arguments)
    } else {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
    }
}





// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
bot_secret_token = ""

client.login(bot_secret_token)