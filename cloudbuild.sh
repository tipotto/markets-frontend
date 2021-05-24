#!/bin/sh

echo "Build process started..."
echo PORT=443 >> .env
echo REACT_APP_BACKEND_API="http://www.markets-jp.com:8080" >> .env