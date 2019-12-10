# Discord_Bot

Steps to run:
1. Clone this repo
2. Open the cloned repo in an editor such as Visual Studio Code.
3. Run Npm install
4. Run Npm install discord.js
5. Find your bots token, by going to https://discordapp.com/developers/applications/ and finding your server.
6. Click on your application -> Bot -> Token -> "Copy"
7. Set your discord bots token in a config.js file like this(Git will ignore this file so that the token will not be public): 

module.exports = {
    DISCORD_BOT_TOKEN : "TOKEN" 
}

8. Run node Discord_bot.js to start the bot.
9. Hit CTRL C to stop the bot.
