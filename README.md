# Discord_Bot
1. install on Linux:
clone repo
```
#install node
#install npm
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

Docker-compose
Start Bot(-d is to run in the background): 
```
docker-compose up -d
```
Start Bot with a rebuild: 
```
docker-compose up --build --remove-orphans -d
```
Remove Stopped Bot 
```
docker-compose rm -f
```
Stop the Bot(if you ran it with -d) 
```
docker-compose down
```
