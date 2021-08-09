#!/bin/bash

export DEBIAN_FRONTEND=noninteractive
apt update
apt install -y -q \
nodejs npm gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates \
fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

if [ -d $npm_config_cache ]; then
  echo '/home/cache/.npm directory exists.'

  cp -R $npm_config_cache/node_modules .
  echo 'node_modules content'
  echo "$(ls node_modules)"
#   echo "$(ls -la | grep node_modules)"
  echo 'current directory content'
  echo "$(ls -la)"

else
  echo '/home/cache/.npm directory does not exist.'

  npm i
  npm i puppeteer
  cp -R ./node_modules $npm_config_cache

fi

npm run build
mv ./build html