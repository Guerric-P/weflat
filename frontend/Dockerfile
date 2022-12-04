FROM node:14-alpine as build-stage
WORKDIR /app
COPY ./ /app/
ARG environment
RUN npm install
RUN npm run build:ssr:$environment

FROM node:14-alpine

COPY --from=build-stage /app/dist/ /app/dist/
RUN npm install -g pm2

# Expose port
EXPOSE 4000

RUN node dist/server/main.js

ENTRYPOINT ["sh","/docker-entrypoint.sh"]
