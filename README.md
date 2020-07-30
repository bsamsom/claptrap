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

Node:
1. Run node index.js to start the bot.
2. Hit CTRL C to stop the bot.

Docker:
1. build container:
```docker build -t my-bot .```
2. run container(-d runs in background):
```docker run --name="discord_bot" -d my-bot```
3. To stop the bot kill the container:
  ```docker container kill discord_bot```

Docker-compose
1. Start bot: docker-compose up -d
2. rebuild bot: docker-compose up --build --remove-orphans -d
3. remove stopped containers ```docker-compose rm -f```
4. stop all containers ```docker-compose down```

Docker:
- build container:
  ```docker build -t my-bot .```
- run container(-d runs in background):
  ```docker run --name="Discord_bot" -d my-bot```
- get all contianers:
  ```docker ps```
- get Discord_bot container id:
  ```docker ps -aqf "name=discord_bot"```
- kill container:
  ```docker kill discord_bot```
  ```docker kill discord_dicord_redis```
- container logs:
  ```docker logs discord_bot```
  ```docker logs discord_redis```
- run on contianer:
  ```docker exec -it <container id> /bin/bash```
