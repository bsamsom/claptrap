module.exports = {
    name: 'listserverroles',
    description: 'listserverroles',
    args: false,
    usage: '',
    guildOnly: true,
    execute(message, args) {
        allRoles = message.guild.roles
        printString = ""
        allRoles.forEach((role) => {
            printString += role.name + ", "
        })
        printString = printString.substr(0, printString.length-2)// remove extra ', '
        message.channel.send(printString)
    }
}