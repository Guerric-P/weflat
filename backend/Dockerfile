FROM maven:3.9.6 as build-stage
WORKDIR /app
COPY ./ /app/
ARG profile
RUN mvn clean install spring-boot:repackage -Dmaven.test.skip=true -P production

FROM amazoncorretto:21

VOLUME /tmp
COPY --from=build-stage /app/target/backend-0.0.1-SNAPSHOT.jar /app/app.jar

COPY ./docker-entrypoint.sh /
RUN chmod 755 /docker-entrypoint.sh

ENTRYPOINT ["sh","/docker-entrypoint.sh"]

EXPOSE 8080
