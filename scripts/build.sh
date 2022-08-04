#!/bin/bash


if [ "$1" == "LOCAL" ]; then
    echo "Usage: build.sh <version>"
    read -p "Enter Local API_KEY " API_KEY
    read -p "Enter Local API_URL " API_URL
    
elif [ "$1" == "STAGE" ]; then
    read -p "Enter STAGING API_KEY " API_KEY
    read -p "Enter STAGING API_URL " API_URL
elif [ "$1" == "RELEASE" ]; then
    read -p "Enter RELEASE API_KEY " API_KEY
    read -p "Enter RELEASE API_URL " API_URL
else
    echo "Building version $1"
fi

# Update the keys file to include the files herein
echo "
export const auth =
{
    key: \"$API_KEY\",
    url: \"$API_URL\"
} 
" >  main/key.ts

# sed -i "s/key.yapeeKey/$API_KEY/g" main/yoco.js
# sed -i "s/key.url/$API_URL/g" main/yoco.js
