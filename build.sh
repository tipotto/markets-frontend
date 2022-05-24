#!/bin/bash

set -e -u

export DEBIAN_FRONTEND=noninteractive
apt update
apt install -y -q \
nodejs npm gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates \
fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

if [ -s $npm_cache ]; then
  echo '/home/cache/node_modules size is NOT zero.'
  cp -R $npm_cache .
  
  echo '/home/cache/node_modules content:'
  echo "$(ls -la node_modules | wc -l)"
  
  echo 'current directory content:'
  echo "$(ls -la)"

else
  echo '/home/cache/node_modules size is zero.'
  NODE_ENV=production npm i --force
  npm i puppeteer
  
  echo "Cache restore"
  echo "Compressing Node dependencies into npm.tgz"
  tar -czf /tmp/npm.tgz -C ./node_modules .

  echo "Saving dependencies to gs://$npm_cache_bucket/"
  gsutil -q -m cp /tmp/npm.tgz gs://$npm_cache_bucket/
  
  echo "Saving timestamp to gs://$npm_cache_bucket/timestamp"
  date +%s | gsutil -q cp - gs://$npm_cache_bucket/timestamp
fi

npm run build
mv ./build html