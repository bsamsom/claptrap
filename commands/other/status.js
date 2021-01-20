const fetch = require('node-fetch');

module.exports = {
	name: 'status',
	description: 'Checks the status of a site',
	aliases: [''],
	args: true,
	usage: '!status roll20, minecraft',
	guildOnly: false,
	execute(message, args) {
        site = args[0].toLowerCase();
        if(site == 'roll20'){
            checkStatus('http://status.roll20.net', message)
        }
        else if(site == 'minecraft'){
            checkStatus('https://status.mojang.com/check', message)
        }
        else{
            message.channel.send('Status for ' + site + ' not found.');
        }
	},
};
function checkStatus(website, message){
    fetch(website, { method: 'GET', headers: { Accept: 'application/json' } })
    .then(res => res.json())
    .then(json => {
        message.channel.send(JSON.stringify(json));
        return;
    })
    .catch(e => {
        message.channel.send('Failed to deliver status for: ' + website);
        return console.error(e);
    });
}