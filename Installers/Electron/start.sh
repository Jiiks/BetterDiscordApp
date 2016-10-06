!#/bin/bash

if [[ FRESHINSTALL=true ]]; then
./node_modules/.bin/eletron ./src
set -e FRESHINSTALL=false
fi
