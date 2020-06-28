# Discord_Bot

<h2>Steps to run:</h2>
<ol>
<li>Clone this repo</li>
<li>Open the cloned repo in an editor such as Visual Studio Code.</li>
<li>Install nodejs(https://nodejs.org/en/download/) one of the option is to install additional software, this will install python and chocolatey.</li>


Linux:
<li>clone repo</li>
<li>brew install python</li>
<li>brew install ffmpeg</li>
<li>brew install node</li>
<li>apt install npm</li>
<li>npm install</li>


<li>Find your bots token, by going to https://discordapp.com/developers/applications/ and finding your server.</li>
<li>Click on your application -> Bot -> Token -> "Copy"</li>
<li>Set your discord bots token in a config.json file like this(Git will ignore this file so that the token will not be public): </li>


{<br>
&nbsp;&nbsp;&nbsp;&nbsp;"prefix": "!",<br>
&nbsp;&nbsp;&nbsp;&nbsp;"token" : "token-id", <br>
} <br>


<li>Run node index.js to start the bot.</li>
<li>Hit CTRL C to stop the bot.</li>
</ol>


The following is installed in the command prompt by running as an admin<br>
&nbsp;&nbsp;&nbsp;&nbsp;choco:<br>
> @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"


The following is installed in powershell by running as an admin<br>
&nbsp;&nbsp;&nbsp;&nbsp;python:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;npm install windows-build-tools<br>
&nbsp;&nbsp;&nbsp;&nbsp;ffmpeg:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;choco install ffmpeg<br>

