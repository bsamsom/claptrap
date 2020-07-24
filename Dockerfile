FROM node:latest

#Grab the latest code from master
RUN CD /home/bsamsom/github/Discord_Bot
RUN git pull

# Create the directory!
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy and Install our bot
COPY package.json /usr/src/bot
RUN npm install

# Our precious bot
COPY . /usr/src/bot

# Start me!
CMD ["node", "index.js"]


