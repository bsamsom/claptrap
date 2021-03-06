const CronJob = require('cron').CronJob;
const { guild_id, hubot_testing, dungeons_and_dragons } = require('./config.json');
const cronJobs = [];

function dnd_sessions(client) {
	//https://github.com/kelektiv/node-cron
	// second(0-59), minute(0-59), hour(0-23), day(1-31), month(0-11), day of week(0-6)[sun-sat]
	const job = new CronJob('0 0 12 * * 3', function() {
		const guild = client.guilds.cache.get(guild_id);
		const channel = guild.channels.cache.get(dungeons_and_dragons);
		//const channel = guild.channels.cache.get(hubot_testing);
		const args = [ 'schedule', 'next' ];
		const command = args.shift().toLowerCase();
		client.commands.get(command).execute(channel, args);
	},
		null, true, 'America/Winnipeg'
	);
	job.start();
	
    cron_object = [];
    cron_object.cron = job;
    cron_object.name = "dnd_sessions";
    cronJobs.push(cron_object)
}

function test_cron(client) {
    // this is a test cron that runs 1 minute after the bot starts.
    today = new Date();
    var min = today.getMinutes();
    var hour = today.getHours();
    var day = today.getDay();
    if (min != 59){
        min ++;
    }
    else{
        min = 0;
        hour ++;
    }
    
	//https://github.com/kelektiv/node-cron
	// second(0-59), minute(0-59), hour(0-23), day(1-31), month(0-11), day of week(0-6)[sun-sat]
	const job = new CronJob(`0 ${min} ${hour} * * ${day}`, function() {
		const guild = client.guilds.cache.get(guild_id);
		const channel = guild.channels.cache.get(hubot_testing);
		const args = [ 'schedule', 'next' ];
		const command = args.shift().toLowerCase();
		client.commands.get(command).execute(channel, args);
	},
		null, true, 'America/Winnipeg'
	);
	job.start();
	
    cron_object = [];
    cron_object.cron = job;
    cron_object.name = "test_cron";
    cronJobs.push(cron_object)
}

function loadcrons(client){
    dnd_sessions(client);
    //test_cron(client);
}

module.exports = {
    loadcrons,
    cronJobs
}