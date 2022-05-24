#!/bin/bash

export DEBIAN_FRONTEND=noninteractive
apt update
apt install -y -q \
nodejs npm gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates \
fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

# if [ -s $npm_cache_path ]; then
if [ -e $volume_path/cache_flag.txt ]; then
  echo 'Node modules are needed to install.'
  NODE_ENV=production npm i --force
  npm i puppeteer
  cp -R ./node_modules/* $npm_cache_path

else
  echo 'Available cache already exists.'
  cp -R $npm_cache_path .
  
  echo '/home/cache/node_modules content:'
  echo "$(ls -la node_modules | wc -l)"
  
  echo 'current directory content:'
  echo "$(ls -la)"
fi

npm run build
mv ./build html