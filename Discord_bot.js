const Discord = require('discord.js')
const config = require("./config.js")
const lists = require("./Lists.js")
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    client.user.setActivity("Youtube", {type: "WATCHING"})
})

client.on('message', (message) => {
    if (message.author == client.user) {
        return // Prevent bot from responding to its own messages
    }
    if (message.content.startsWith("!")) {
        processCommand(message)
    }
    else{
        messageContains(message)
    }
})

function messageContains(message) {
    if(message.content.includes("food")){
        message.react("🥞")
    }
    if(message.content.includes("died") || message.content.includes("death") || message.content.includes("kill")){
        message.react("☠")
    }
}

function processCommand(message) {
    fullCommand = message.content.substr(1) // Remove the leading exclamation mark
    splitCommand = fullCommand.split(",") // Split the message up in to pieces for comma(My server contains roles with spaces)
    command = splitCommand[0] // The first word directly after the exclamation is the command
    arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
    user = getUser(message)
    guild = message.guild;//get the current guild

    console.log("Command received: " + command + " sent by user: " + user.toString() + " " + user.displayName)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (command == "help") {
        helpCommand(arguments, message)
    }else if(checkForRole(user,["Admin"])){
        if (command == "listServers") {
            lists.listServers()
        }else if (command == "listMembers") {
            lists.listMembersWithRole(user, message, arguments)
        }else if (command == "listServerRoles"){
            lists.listServerRoles(user, message)
        }
    }else {
        message.channel.send("I don't understand the command. Try `!help`")
    }
}

function checkForRole(user, requiredRole){
    return user.roles.some(role=>requiredRole.includes(role.name))// check if the user has the required role
}

function getUser(message){
    guild = message.guild;
    return guild.member(message.author)// returns the actaul user so that .name and .displayname work
}

client.login(config.DISCORD_BOT_TOKEN)