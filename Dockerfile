FROM node:15.11.0-alpine3.10    

ENV TZ=America/Mexico_City

# install mininiumal requirements
RUN apk add --update \
    && apk add --no-cache \
        ffmpeg \
        python \
        make \
        g++ \
        tzdata \
    && rm -rf /var/cache/apk/*

# create working dir
WORKDIR /usr/src/bot

#copy required setup files
COPY package.json ./
COPY package-lock.json ./
COPY config.json ./
COPY client_secret.json ./

RUN npm install --production

# Copy everything else
COPY . .

CMD [ "node", "claptrap.js" ]

