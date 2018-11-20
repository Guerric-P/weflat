#!/bin/bash
. common.sh

set -e
cd /app
pm2 start /dist/server.js --no-daemon
checkerror "Echec de pm2 start"
bash -c "$@"
