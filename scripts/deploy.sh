#!/bin/sh

set -e

zip -r build/yapee.zip -i build/yapee.min.js 

curl -X POST -H "Authorization: Bearer $TOKEN" -F "file=@build/yapee.zip" https://cloud.yapee.me/bot$BOT_TOKEN/deploy