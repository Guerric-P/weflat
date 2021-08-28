FROM node:14-stretch as build-stage
WORKDIR /app
COPY ./ /app/
ARG environment
RUN npm install
RUN npm run build:ssr:$environment

FROM node:10.13.0-alpine

COPY --from=build-stage /app/dist/ /app/dist/
RUN npm install -g pm2

# Expose port
EXPOSE 4000

COPY ./common.sh /
COPY ./docker-entrypoint.sh /
RUN chmod 755 /docker-entrypoint.sh

ENTRYPOINT ["sh","/docker-entrypoint.sh"]
