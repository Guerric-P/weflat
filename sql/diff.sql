CREATE INDEX ix_zip_code_number
    ON weflat.zip_code USING btree
    ("number" COLLATE pg_catalog."default" bpchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;
	
CREATE SEQUENCE weflat.password_change_request_id_seq
    INCREMENT 1
    START 1
;

ALTER SEQUENCE weflat.password_change_request_id_seq
    OWNER TO postgres;

CREATE TABLE weflat.password_change_request
(
    id integer NOT NULL DEFAULT nextval('weflat.password_change_request_id_seq'::regclass),
    user_id integer NOT NULL,
    hash character varying NOT NULL,
    expiration_date timestamp without time zone,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)
        REFERENCES weflat."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
);

ALTER TABLE weflat.password_change_request
    OWNER to postgres;