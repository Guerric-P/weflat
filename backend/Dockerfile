FROM maven:3.6.0-jdk-8 as build-stage
WORKDIR /app
COPY ./ /app/
RUN mvn clean install spring-boot:repackage -Dmaven.test.skip=true

FROM openjdk:8-jdk-alpine

VOLUME /tmp
COPY --from=build-stage /app/target/backend-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]

EXPOSE 8080
