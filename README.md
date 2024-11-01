# Discord_Bot
1. install on Linux:
clone repo
```
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
  "token" : "token-id"
}
```

## Docker-compose
Start Bot(add -d to run in the background): 
```
docker-compose --env-file .env up
```
Start Bot with a rebuild: 
```
docker-compose --env-file .env up --build --remove-orphans
```
Remove Stopped Bot 
```
docker-compose rm -f
```
Stop the Bot(if you ran it with -d) 
```
docker-compose down
```

## Dependencies/Setup:

https://nodejs.org/
https://docs.docker.com/desktop/install/windows-install/


install packages:
```
$ npm install
```

## Runing locally for development:
run to build the go binaries that the docker file builds
```
cd commands/go && go build *.go
```

```
npm run start
npm run debug
```

## Supported languages:
```
javascript
```