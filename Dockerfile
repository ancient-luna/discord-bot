FROM node:24-alpine

# Install system dependencies
# canvas: build-base, cairo-dev, etc.
# discord-voice/ffmpeg: ffmpeg, python3, make, g++
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    build-base \
    cairo-dev \
    pango-dev \
    jpeg-dev \
    giflib-dev \
    librsvg-dev \
    ffmpeg

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
