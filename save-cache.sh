#!/bin/bash
# save-cache: Save the npm cache to GCS.
# $npm_config_cache = /home/cache/.npm
# cloudbuildのボリューム（$npm_config_cache）からファイルをコピー
# コピーしたファイルをtgz形式で圧縮
# GCSのバケットにtgzファイルをコピー
# GCSのバケットにタイムスタンプをコピー

# TIMESTAMP=$(gsutil cat gs://$my_cache_bucket/timestamp || echo 0)
# SECONDS_IN_A_MONTH=2629743

# if ! [ -d $npm_config_cache ]; then
# if (( $(date +%s) - $TIMESTAMP >= $SECONDS_IN_A_MONTH )); then
#   set -e -u
#   tar -czf /tmp/npm.tgz -C $npm_config_cache .
#   echo "$(tar -tvzf /tmp/npm.tgz | wc -l) files copied from $npm_config_cache"

#   echo "Saving dependencies to gs://$my_cache_bucket/"
#   gsutil -q -m cp /tmp/npm.tgz gs://$my_cache_bucket/

#   echo "Saving timestamp to gs://$my_cache_bucket/timestamp"
#   date +%s | gsutil -q cp - gs://$my_cache_bucket/timestamp

# fi

set -e -u

tar -czf /tmp/npm.tgz -C $npm_config_cache .
echo "$(tar -tvzf /tmp/npm.tgz | wc -l) files copied from $npm_config_cache"

echo "Saving dependencies to gs://$my_cache_bucket/"
gsutil -q -m cp /tmp/npm.tgz gs://$my_cache_bucket/

echo "Saving timestamp to gs://$my_cache_bucket/timestamp"
date +%s | gsutil -q cp - gs://$my_cache_bucket/timestamp
