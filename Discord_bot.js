const Discord = require('discord.js')
const config = require("./config.js")
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    //set the bot to `playing With JavaScript` 
    //client.user.setActivity("With JavaScript")
    //Set the bot to watching youtube
    client.user.setActivity("Youtube", {type: "WATCHING"})
})


client.on('message', (message) => {
    // Prevent bot from responding to its own messages
    if (message.author == client.user) {
        return
    }
    if (message.content.startsWith("!")) {
        processCommand(message)
    }
    else{
        messageContains(message)
    }
})

function messageContains(message) {
    message = message.content
    if(message.includes("food")){
        message.react("🥞")
    }
}

function processCommand(message) {
    fullCommand = message.content.substr(1) // Remove the leading exclamation mark
    splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
    user = getUser(message)
    guild = message.guild;//get the current guild

    console.log("Command received: " + primaryCommand + " sent by user: " + user.toString() + " " + user.displayName)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "help") {
        helpCommand(arguments, message)
    }else if (primaryCommand == "listServers") {
        if(checkRole(user,["Admin"])){
            listServers()
        }else{
            message.channel.send("You dont have access to the `!list` command")
        }
    }else if (primaryCommand == "listMembers") {
        if(checkRole(user,["Admin"])){
            listMembersWithRole(user, message, arguments)
        }else{
            message.channel.send("You dont have access to the `!list` command")
        } 
    }else {
        message.channel.send("I don't understand the command. Try `!help`")
    }
}

function checkRole(user, requiredRole){
    return user.roles.some(role=>requiredRole.includes(role.name))
}

function listMembersWithRole(user, message, roles){
    guild = message.guild;
    roles.forEach((role) => {
        myRole = message.guild.roles.find(r => r.name === role)
        membersWithRole = message.guild.roles.get(myRole.id).members
        printString = `there are ${membersWithRole.size} members with the Role of: ${role}\n`
        membersWithRole.forEach((user) => {
            member = guild.member(user)
            printString += "\t" + member.displayName + "\n"
        })
        message.channel.send(printString)
    })
}

function getUser(message){
    guild = message.guild;
    return guild.member(message.author)
}

function helpCommand(arguments, message) {
    if (arguments.length > 0) {
        message.channel.send("It looks like you might need help with " + arguments)
    } else {
        message.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
    }
}

function listServers(){
    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name + " " + guild.id)
         // List all channels of each server
         guild.channels.forEach((channel) => {
            console.log(`\t${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
}

client.login(config.DISCORD_BOT_TOKEN)