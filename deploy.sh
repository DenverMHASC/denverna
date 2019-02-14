#!/bin/bash

if [[ "$TRAVIS_BRANCH/$TRAVIS_PULL_REQUEST" == "master/false" ]]; then
    echo "Uploading dist/bundle.js"
    curl --ftp-create-dirs -T dist/bundle.js --user $FTP_USERNAME:$FTP_PASSWORD ftp://ftp.nacolorado.org/dist/bundle.js
    echo "Uploading dist/bundle.js.map"
    curl --ftp-create-dirs -T dist/bundle.js.map --user $FTP_USERNAME:$FTP_PASSWORD ftp://ftp.nacolorado.org/dist/bundle.js.map
    echo "Uploading index.html"
    curl --ftp-create-dirs -T index.html --user $FTP_USERNAME:$FTP_PASSWORD ftp://ftp.nacolorado.org/index.html
fi
