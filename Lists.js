module.exports = {
    listServerRoles: function (user, message){
        allRoles = message.guild.roles
        printString = ""
        allRoles.forEach((role) => {
            printString += role.name + ", "
        })
        printString = printString.substr(0, printString.length-2)// remove extra ', '
        message.channel.send(printString)
    },

    listMembersWithRole: function (user, message, roles){
        guild = message.guild;
        roles.forEach((role) => {
            role = role.charAt(0).toUpperCase() + role.substr(1,role.length)//Roles are capitalized on my server
            myRole = message.guild.roles.find(r => r.name === role)
            if(myRole != null){
                membersWithRole = message.guild.roles.get(myRole.id).members
                printString = `there are ${membersWithRole.size} members with the Role of: ${role}\n`
                membersWithRole.forEach((user) => {
                    member = guild.member(user)
                    printString += "\t" + member.displayName + "\n"
                })
                message.channel.send(printString)
            }
        })
    },

    listServers: function (client){
        console.log("Servers:")// List servers the bot is connected to
        client.guilds.forEach((guild) => {
            console.log(" - " + guild.name + " " + guild.id)// List all channels of each server
            guild.channels.forEach((channel) => {
                console.log(`\t${channel.name} (${channel.type}) - ${channel.id}`)
            })
        })
    }
}