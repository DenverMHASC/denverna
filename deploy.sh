#!/bin/bash

if [[ "$TRAVIS_BRANCH/$TRAVIS_PULL_REQUEST" == "master/false" ]]; then

    gitLastCommit=$(git show --summary --grep="Merge pull request")
    if [[ -z "$gitLastCommit" ]]
    then
        lastCommit=$(git log --format="%H" -n 1)
    else
        echo "We got a Merge Request!"
        #take the last commit and take break every word into an array
        arr=($gitLastCommit)
        #the 5th element in the array is the commit ID we need. If git log changes, this breaks. :(
        lastCommit=${arr[4]}
    fi
    echo $lastCommit


    filesChanged=$(git diff-tree --no-commit-id --name-only -r $lastCommit)

    if [ ${#filesChanged[@]} -eq 0 ]; then
        echo "No files to update"
    else
        echo "Uploading dist/bundle.js"
        curl --ftp-create-dirs -T dist/bundle.js --user $FTP_USERNAME:$FTP_PASSWORD ftp://ftp.nacolorado.org/dist/bundle.js
        echo "Uploading dist/bundle.js.map"
        curl --ftp-create-dirs -T dist/bundle.js.map --user $FTP_USERNAME:$FTP_PASSWORD ftp://ftp.nacolorado.org/dist/bundle.js.map
    fi

fi
