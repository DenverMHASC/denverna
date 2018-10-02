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
        for f in $filesChanged
        do
            #do not upload these files that aren't necessary to the site
            if [ "$f" != ".travis.yml" ] && [ "$f" != "deploy.sh" ] && [ "$f" != "test.js" ] && [ "$f" != "package.json" ]
            then
                echo "Uploading $f"
                curl --ftp-create-dirs -T $f --user $FTP_USERNAME:$FTP_PASSWORD ftp://ftp.nacolorado.org/test/$f
            fi
        done
        echo "Uploading dist/main.js"
        curl --ftp-create-dirs -T dist/main.js --user $FTP_USERNAME:$FTP_PASSWORD ftp://ftp.nacolorado.org/test/dist/main.js
        echo "Uploading dist/main.js.map"
        curl --ftp-create-dirs -T dist/main.js.map --user $FTP_USERNAME:$FTP_PASSWORD ftp://ftp.nacolorado.org/test/dist/main.js.map
    fi

fi
