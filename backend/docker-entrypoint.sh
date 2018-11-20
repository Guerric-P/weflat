#!/bin/sh

set -e
cd /app
java -Djava.security.egd=file:/dev/./urandom -jar app.jar
checkerror "Echec de java"
sh -c "$@"
