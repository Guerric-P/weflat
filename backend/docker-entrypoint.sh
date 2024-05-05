#!/bin/sh

set -e
cd /app
java --add-opens java.base/java.lang=ALL-UNNAMED -Djava.security.egd=file:/dev/./urandom -jar app.jar
checkerror "Echec de java"
sh -c "$@"
