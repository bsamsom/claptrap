FROM node:15.11.0-alpine3.10    

# create working dir
WORKDIR /usr/src/bot
ENV GO_DIR=/usr/src/bot/commands/go
ENV TZ=America/Winnipeg

# install mininiumal requirements
RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
        ffmpeg \
        python \
        make \
        g++ \
        tzdata \
        curl \
        bash \
        gcc \
        go \
    && rm -rf /var/cache/apk/*


#copy required setup files
COPY package.json ./
COPY package-lock.json ./
RUN npm install --production

COPY config.json ./
COPY client_secret.json ./

# Copy everything else
COPY . .

#build go binaries from files"
RUN cd $GO_DIR && go build *.go

CMD [ "node", "claptrap.js" ]

