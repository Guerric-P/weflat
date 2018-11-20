FROM node:10.13.0-stretch as build-stage
WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm run build:ssr:test
ARG configuration=production

FROM node:10.13.0-alpine

COPY --from=build-stage /app/dist/ /app/dist/
RUN npm install -g pm2

# Expose port
EXPOSE 4000

COPY ./common.sh /
COPY ./docker-entrypoint.sh /
RUN chmod 755 /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
