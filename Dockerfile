FROM node:22.11.0-alpine  

# create working dir
WORKDIR /usr/src/bot
ENV TZ=America/Winnipeg

# install mininiumal requirements
RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
        tzdata \
    && rm -rf /var/cache/apk/*

#copy required setup files
COPY package.json ./

RUN npm install

# Copy everything else
COPY . .

CMD [ "node", "claptrap.js" ]

