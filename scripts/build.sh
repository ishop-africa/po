#!/bin/bash


if [ "$1" == "BUILD" ]; then 
    webpack --env production
    exit 0
elif [ "$1" == "ESTORE" ]; then
    echo "replace oracle.js with estore"
    awk'{sub(/oracle.js/,estore.js); print}'  webpack.config.js 
    webpack --env production -o .build
    echo "Rplacing estore.js with oracle.js"
     awk'{sub(/estore.js/,oracle.js); print}'  webpack.config.js
    exit 0
elif [ "$1" == "HASH" ]; then
    openssl dgst -sha384 -binary dist/estore.js | openssl base64 -A -out dist/estore.js.sha384
else
    if [ "$1" == "LOCAL" ]; then
        echo "Usage: build.sh <version>"
        read -p "Enter Local API_KEY " API_KEY
        read -p "Enter Local API_URL " API_URL
        read -p "Enter TESTING PUBLIC_KEY " PUBLIC_KEY
        
    elif [ "$1" == "STAGE" ]; then
        read -p "Enter STAGING API_KEY " API_KEY
        read -p "Enter STAGING API_URL " API_URL
        read -p "Enter TESTING PUBLIC_KEY " PUBLIC_KEY

    elif [ "$1" == "RELEASE" ]; then
        read -p "Enter RELEASE API_KEY " API_KEY
        read -p "Enter RELEASE API_URL " API_URL
        read -p "Enter LIVE PUBLIC_KEY " PUBLIC_KEY
    else
        echo "Usage: build.sh <version>"
        exit 1
    fi
fi

# Update the keys file to include the files herein

