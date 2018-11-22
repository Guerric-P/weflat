#!/bin/sh
. common.sh

set -e
cd /app
pm2 start dist/server.js --no-daemon -o /app/log/output.log -e /app/log/error.log
checkerror "Echec de pm2 start"
sh -c "$@"
