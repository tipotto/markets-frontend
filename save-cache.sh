#!/bin/bash
# save-cache: Save the npm cache to GCS.
# $npm_cache = /home/cache/.npm
# cloudbuildのボリューム（$npm_cache）からファイルをコピー
# コピーしたファイルをtgz形式で圧縮
# GCSのバケットにtgzファイルをコピー
# GCSのバケットにタイムスタンプをコピー

set -e -u

if [ -e $volume_path/cache_flag.txt ]; then
  tar -czf /tmp/npm.tgz -C $npm_cache_path .
  echo "Cached dependencies are copied from $npm_cache_path"
#   echo "$(tar -tvzf /tmp/npm.tgz | wc -l) files copied from $npm_cache"

  echo "Saving dependencies to gs://$npm_cache_bucket/"
  gsutil -q -m cp /tmp/npm.tgz gs://$npm_cache_bucket/
  
  echo "Saving timestamp to gs://$npm_cache_bucket/timestamp"
  date +%s | gsutil -q cp - gs://$npm_cache_bucket/timestamp
fi