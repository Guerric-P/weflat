FROM node:14-alpine as build-stage
WORKDIR /app
COPY ./ /app/
ARG environment
RUN npm install
RUN npm run build:ssr:$environment

FROM node:14-alpine

COPY --from=build-stage /app/dist/ /app/dist/

# Expose port
EXPOSE 4000

ENTRYPOINT node dist/server/main.js
