module.exports = {
    name: 'rolemembers',
    description: 'Lists all members on a server with the provided role.',
    aliases: [''],
    args: true,
    usage: '<role>',
    guildOnly: true,
    execute(message, args) {//user roles
        guild = message.guild;
        role = args[0]
        roles = message.guild.roles.find(role => role.name === args[0]);
        console.log(role)
        if(roles != null){
            membersWithRole = message.guild.roles.get(roles.id).members
            printString = `there are ${membersWithRole.size} members with the Role of: ${role}\n`
            membersWithRole.forEach((user) => {
                member = guild.member(user)
                printString += "\t" + member.displayName + "\n"
            })
            message.channel.send(printString)
        }
    }
}