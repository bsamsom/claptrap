# Discord_Bot

Steps to run:
1. Clone this repo
2. Open the cloned repo in an editor such as Visual Studio Code.
3. Run Npm install
4. Run Npm install discord.js
5. npm install google-spreadsheet
6. Find your bots token, by going to https://discordapp.com/developers/applications/ and finding your server.
7. Click on your application -> Bot -> Token -> "Copy"
8. Set your discord bots token in a config.json file like this(Git will ignore this file so that the token will not be public): 

{
    "prefix": "!",
    "token" : "token-id", 
} 

9. Run node index.js to start the bot.
10. Hit CTRL C to stop the bot.

Npm install

requires: python
    admin in powershell: 
        npm install windows-build-tools
requires: choco
    admin powershell:
        Set-ExecutionPolicy Bypass -Scope Process -Force; `
        >>   iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
requires: ffmpeg
    admin powershell:
        choco install ffmpeg
