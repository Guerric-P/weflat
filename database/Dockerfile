FROM postgres:9.2

ENV POSTGRES_USER weflat
ENV POSTGRES_PASSWORD P@ssw0rd
ENV POSTGRES_DB weflat

ADD ./database.sql /docker-entrypoint-initdb.d/
