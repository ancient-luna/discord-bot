FROM node:24-alpine

# Install system dependencies
# canvas: build-base, cairo-dev, etc.
# discord-voice/ffmpeg: ffmpeg, python3, make, g++
# py3-setuptools: required for node-gyp on Python 3.12+ (distutils removal)
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
    ffmpeg \
    py3-setuptools

WORKDIR /app

COPY package*.json ./

# Ensure we use a node-gyp version compatible with Python 3.12
RUN npm install -g node-gyp

RUN npm install

COPY . .

CMD ["npm", "start"]
