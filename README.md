# Discord_Bot
1. install on Linux:
clone repo
```
install python
install ffmpeg
install node
install npm
install docker
install docker-compose
npm install
```

2. Find your bots token, by going to https://discordapp.com/developers/applications/ and finding your server.
3. Click on your application -> Bot -> Token -> "Copy"
4. Set your discord bots token in a config.json file like this(Git will ignore this file so that the token will not be public): 

```
{
  "prefix": "!",
  "token" : "token-id"
}
```

<li>Run node index.js to start the bot.</li>
<li>Hit CTRL C to stop the bot.</li>


Docker:
- build container:
  ```docker build -t my-bot .```
- run container(-d runs in background):
  ```docker run --name="Discord_bot" -d my-bot```
- get all contianers:
  ```docker ps```
- get Discord_bot container id:
  ```docker ps -aqf "name=Discord_bot"```
- kill container:
  ```docker container kill Discord_bot```
- container logs:
  ```docker logs <our container's ID>```
- run on contianer:
  ```docker exec -it <container id> /bin/bash```
