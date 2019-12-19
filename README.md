# Discord_Bot

<h2>Steps to run:</h2>
<ol>
<li>1. Clone this repo</li>
<li>2. Open the cloned repo in an editor such as Visual Studio Code.</li>
<li>3. Run Npm install</li>
<li>4. npm install google-spreadsheet</li>
<li>5. Find your bots token, by going to https://discordapp.com/developers/applications/ and finding your server.</li>
<li>6. Click on your application -> Bot -> Token -> "Copy"</li>
<li>7. Set your discord bots token in a config.json file like this(Git will ignore this file so that the token will not be public): </li>

<p>
{<br>
    "prefix": "!",<br>
    "token" : "token-id", <br>
} <br>
</p>
<li>9. Run node index.js to start the bot.</li>
<li>10. Hit CTRL C to stop the bot.</li>
</ol>

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
