FROM node:10.13.0-stretch as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
RUN npm install -g --unsafe-perm @angular/cli@latest
COPY ./ /app/
ARG configuration=production
RUN npm run build:ssr:test
RUN npm install -g pm2
RUN pm2 start /app/dist/server.js
