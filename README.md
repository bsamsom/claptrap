# Discord_Bot

<h2>Steps to run:</h2>
1. Clone this repo
2. Open the cloned repo in an editor such as Visual Studio Code.
3. Run Npm install
4. npm install google-spreadsheet
5. Find your bots token, by going to https://discordapp.com/developers/applications/ and finding your server.
6. Click on your application -> Bot -> Token -> "Copy"
7. Set your discord bots token in a config.json file like this(Git will ignore this file so that the token will not be public): 
<p>
{<br>
    "prefix": "!",<br>
    "token" : "token-id", <br>
} <br>
</p>
9. Run node index.js to start the bot.
10. Hit CTRL C to stop the bot.


<pr>
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
</pr>
