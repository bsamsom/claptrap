FROM node:22.11.0-alpine  

# create working dir
WORKDIR /usr/src/bot
ENV GO_DIR=/usr/src/bot/commands/go
ENV TZ=America/Winnipeg

# install mininiumal requirements
RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
        python3 \
        make \
        g++ \
        tzdata \
        curl \
        bash \
    && rm -rf /var/cache/apk/*


#copy required setup files
COPY package.json ./
COPY package-lock.json ./
RUN npm install --production

# Copy everything else
COPY . .

CMD [ "node", "claptrap.js" ]

