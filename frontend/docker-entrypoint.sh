#!/bin/bash
. common.sh

set -e
pm2 start /app/server.js --no-daemon
checkerror "Echec de pm2 start"
bash -c "$@"