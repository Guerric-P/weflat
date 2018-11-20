#!/bin/sh

set -e
cd /app
java -Djava.security.egd=file:/dev/./urandom dist/server.js -jar app.jar
checkerror "Echec de java"
sh -c "$@"
