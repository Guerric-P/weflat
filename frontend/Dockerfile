FROM node:10.13.0-stretch as build-stage
WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm run build:ssr:test
ARG configuration=production

FROM node:10.13.0-stretch

COPY --from=build-stage /app/dist/ /app/
RUN npm install -g pm2

ENTRYPOINT ["pm2","start","/app/server.js"]
