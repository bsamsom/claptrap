FROM alpine:latest
    
# Setup Work directory.
WORKDIR /usr/src/bot
#copy required files
COPY package.json config.json client_secret.json ./

#expose redis port
EXPOSE 6379

# Let's install requirements
RUN apk add --update \
    && apk add --no-cache nodejs-current nodejs-npm \
    && apk add --no-cache --virtual .build git curl build-base g++ \
    && npm install \
    && apk del .build

# Copy project to our WORKDIR
COPY . .

# Let's run it!

CMD [ "node", "index.js" ]

#FROM node:latest

# Create the directory!
#RUN mkdir -p /usr/src/bot
#WORKDIR /usr/src/bot

# Copy and Install our bot
#COPY package.json /usr/src/bot
#RUN npm install

# Our precious bot
#COPY . /usr/src/bot

# Start me!
#CMD ["node", "index.js"]


