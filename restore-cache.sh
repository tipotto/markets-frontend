#!/bin/bash
# restore-cache: Restore the npm cache from GCS.
# $npm_cache = /home/cache/.npm
# GCSのバケットからタイムスタンプを取得（存在しない場合は0）
# タイムスタンプが1ヶ月未満の場合、バケットからtgzファイルをコピーし、tmpフォルダ以下に配置
# ボリュームにキャッシュ保存用のディレクトリ（/home/cache/.npm）を作成
# 各ビルドステップをまたいで利用できるように、tgzファイルをそこに配置

set -e -u

# If there is a cache and the content is not older than a month
TIMESTAMP=$(gsutil cat gs://$npm_cache_bucket/timestamp || echo 0)

if (( $(date +%s) - $TIMESTAMP < $seconds_in_a_month )); then
  gsutil -q -m cp gs://$npm_cache_bucket/npm.tgz /tmp 
  mkdir -p $npm_cache

  # copy npm dependencies
  echo 'Restoring npm cache'
  tar -xzf /tmp/npm.tgz -C $npm_cache
  echo "Cached dependencies are restored to $npm_cache"
#   echo "$(ls -pR $npm_cache | grep -v / | wc -l) files restored to $npm_cache"

else
  if [ ! -d $npm_cache_flag ]; then
    mkdir $npm_cache_flag
  fi
  touch $npm_cache_flag/cache_flag.txt

  if (( $TIMESTAMP == 0 )); then
    echo "Skipping cache restore: timestamp not found at gs://$npm_cache_bucket/timestamp"
  else
    echo "Skipping cache restore: timestamp at gs://$npm_cache_bucket/timestamp is older than a month"
  fi

fi
