FROM alpine:latest
    
# Setup Work directory.
WORKDIR /usr/src/bot
#copy required files
COPY package.json config.json client_secret.json ./

# Let's install requirements
RUN apk add --update \
    && apk add --no-cache nodejs-current nodejs-npm ffmpeg \
    && apk add --no-cache --virtual .build git curl build-base g++ \
    && npm install \
    && apk del .build

RUN npm install ffmpeg

# Copy project to our WORKDIR
COPY . .

CMD [ "node", "claptrap.js" ]

