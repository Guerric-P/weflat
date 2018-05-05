--
-- PostgreSQL database dump
--

-- Dumped from database version 9.2.24
-- Dumped by pg_dump version 9.2.24
-- Started on 2018-05-04 20:48:05

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 8 (class 2615 OID 16559)
-- Name: weflat; Type: SCHEMA; Schema: -; Owner: sa
--

CREATE SCHEMA weflat;


ALTER SCHEMA weflat OWNER TO sa;

--
-- TOC entry 1 (class 3079 OID 11727)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2068 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = weflat, pg_catalog;

--
-- TOC entry 170 (class 1259 OID 16560)
-- Name: user_id_seq; Type: SEQUENCE; Schema: weflat; Owner: sa
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE weflat.user_id_seq OWNER TO sa;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 171 (class 1259 OID 16562)
-- Name: user; Type: TABLE; Schema: weflat; Owner: sa; Tablespace: 
--

CREATE TABLE weflat.user (
    id integer DEFAULT nextval('user_id_seq'::regclass) NOT NULL,
    last_name character varying(50),
    first_name character varying(50),
    birth_date date,
    telephone character varying,
    email character varying,
    password character varying
);


ALTER TABLE weflat.user OWNER TO sa;

--
-- TOC entry 172 (class 1259 OID 16569)
-- Name: customer; Type: TABLE; Schema: weflat; Owner: sa; Tablespace: 
--

CREATE TABLE customer (
    project text
)
INHERITS (weflat.user);


ALTER TABLE weflat.customer OWNER TO sa;

--
-- TOC entry 187 (class 1259 OID 16721)
-- Name: admin; Type: TABLE; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE TABLE admin (
)
INHERITS (weflat.user);


ALTER TABLE weflat.admin OWNER TO postgres;

--
-- TOC entry 173 (class 1259 OID 16576)
-- Name: architect_situation; Type: TABLE; Schema: weflat; Owner: sa; Tablespace: 
--

CREATE TABLE architect_situation (
    id integer NOT NULL,
    label character varying(100)
);


ALTER TABLE weflat.architect_situation OWNER TO sa;

--
-- TOC entry 174 (class 1259 OID 16579)
-- Name: architect_type; Type: TABLE; Schema: weflat; Owner: sa; Tablespace: 
--

CREATE TABLE architect_type (
    id integer NOT NULL,
    label character varying(100)
);


ALTER TABLE weflat.architect_type OWNER TO sa;

--
-- TOC entry 175 (class 1259 OID 16582)
-- Name: architect; Type: TABLE; Schema: weflat; Owner: sa; Tablespace: 
--

CREATE TABLE architect (
    web_site character varying(255),
    motivation text,
    architect_situation_id integer,
    architect_type_id integer,
    practicing_since date,
    architects_order boolean,
    cfai boolean,
    decennial_insurance boolean,
    professional_responsibility boolean,
    status integer,
    cgu boolean,
    iban character varying(28),
    payment_type_id integer
)
INHERITS (weflat.user);


ALTER TABLE weflat.architect OWNER TO sa;

--
-- TOC entry 176 (class 1259 OID 16589)
-- Name: architect_visit; Type: TABLE; Schema: weflat; Owner: sa; Tablespace: 
--

CREATE TABLE architect_visit (
    architect_id integer NOT NULL,
    visit_id integer NOT NULL
);


ALTER TABLE weflat.architect_visit OWNER TO sa;

--
-- TOC entry 177 (class 1259 OID 16592)
-- Name: architect_zip_code; Type: TABLE; Schema: weflat; Owner: sa; Tablespace: 
--

CREATE TABLE architect_zip_code (
    architect_id integer NOT NULL,
    zip_code_id integer NOT NULL
);


ALTER TABLE weflat.architect_zip_code OWNER TO sa;

--
-- TOC entry 188 (class 1259 OID 16728)
-- Name: payment_type; Type: TABLE; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE TABLE payment_type (
    id integer NOT NULL,
    label character varying(100)
);


ALTER TABLE weflat.payment_type OWNER TO postgres;

--
-- TOC entry 178 (class 1259 OID 16595)
-- Name: position; Type: TABLE; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE TABLE "position" (
    id integer NOT NULL,
    label character varying(100) NOT NULL,
    mandatory boolean
);


ALTER TABLE weflat."position" OWNER TO postgres;

--
-- TOC entry 179 (class 1259 OID 16598)
-- Name: renovation_id_seq; Type: SEQUENCE; Schema: weflat; Owner: sa
--

CREATE SEQUENCE renovation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE weflat.renovation_id_seq OWNER TO sa;

--
-- TOC entry 180 (class 1259 OID 16600)
-- Name: renovation; Type: TABLE; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE TABLE renovation (
    id integer DEFAULT nextval('renovation_id_seq'::regclass) NOT NULL,
    report_id integer,
    position_id integer,
    condition integer,
    remarks text,
    estimated_work integer
);


ALTER TABLE weflat.renovation OWNER TO postgres;

--
-- TOC entry 181 (class 1259 OID 16607)
-- Name: report_id_seq; Type: SEQUENCE; Schema: weflat; Owner: sa
--

CREATE SEQUENCE report_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE weflat.report_id_seq OWNER TO sa;

--
-- TOC entry 182 (class 1259 OID 16609)
-- Name: report; Type: TABLE; Schema: weflat; Owner: sa; Tablespace: 
--

CREATE TABLE report (
    id integer DEFAULT nextval('report_id_seq'::regclass) NOT NULL,
    surface integer,
    floor integer,
    rooms integer,
    orientation character varying(100),
    general_remarks text,
    expectations text,
    global_quality_remarks text,
    global_condition integer
);


ALTER TABLE weflat.report OWNER TO sa;

--
-- TOC entry 183 (class 1259 OID 16616)
-- Name: visit; Type: TABLE; Schema: weflat; Owner: sa; Tablespace: 
--

CREATE TABLE visit (
    id integer NOT NULL,
    customer_id integer,
    city character varying(50) NOT NULL,
    architect_id integer,
    zip_code_id integer NOT NULL,
    street_number character varying(10),
    route character varying(100),
    creation_date timestamp without time zone NOT NULL,
    visit_date timestamp without time zone,
    report_id integer,
    status integer,
    announcement_url character varying(255),
    charge_id character varying(50)
);


ALTER TABLE weflat.visit OWNER TO sa;

--
-- TOC entry 184 (class 1259 OID 16619)
-- Name: visit_id_seq; Type: SEQUENCE; Schema: weflat; Owner: sa
--

CREATE SEQUENCE visit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE weflat.visit_id_seq OWNER TO sa;

--
-- TOC entry 185 (class 1259 OID 16621)
-- Name: zip_code; Type: TABLE; Schema: weflat; Owner: sa; Tablespace: 
--

CREATE TABLE zip_code (
    id integer NOT NULL,
    number character(5) NOT NULL,
    active boolean
);


ALTER TABLE weflat.zip_code OWNER TO sa;

--
-- TOC entry 186 (class 1259 OID 16624)
-- Name: zip_code_id_seq; Type: SEQUENCE; Schema: weflat; Owner: sa
--

CREATE SEQUENCE zip_code_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE weflat.zip_code_id_seq OWNER TO sa;

--
-- TOC entry 1878 (class 2604 OID 16626)
-- Name: id; Type: DEFAULT; Schema: weflat; Owner: sa
--

ALTER TABLE ONLY customer ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- TOC entry 1882 (class 2604 OID 16724)
-- Name: id; Type: DEFAULT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY admin ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- TOC entry 1879 (class 2604 OID 16627)
-- Name: id; Type: DEFAULT; Schema: weflat; Owner: sa
--

ALTER TABLE ONLY architect ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);

--
-- TOC entry 2058 (class 0 OID 16721)
-- Dependencies: 187
-- Data for Name: admin; Type: TABLE DATA; Schema: weflat; Owner: postgres
--

INSERT INTO admin VALUES (1, 'Weflat', 'Admin', NULL, NULL, 'contact@weflat.fr', 'yqsyJZHV4HqFhOceoHyA62+VZIoVl8MjXtHK2sZtqSceR0smfjoLSpUpJS0XO6DE');


--
-- TOC entry 2044 (class 0 OID 16576)
-- Dependencies: 173
-- Data for Name: architect_situation; Type: TABLE DATA; Schema: weflat; Owner: sa
--

INSERT INTO architect_situation VALUES (2, 'Libéral HMONP/DPLG');
INSERT INTO architect_situation VALUES (1, 'Salarié');
INSERT INTO architect_situation VALUES (3, 'Architecte d''intérieur indépendant');


--
-- TOC entry 2045 (class 0 OID 16579)
-- Dependencies: 174
-- Data for Name: architect_type; Type: TABLE DATA; Schema: weflat; Owner: sa
--

INSERT INTO architect_type VALUES (2, 'Architecte d''intérieur');
INSERT INTO architect_type VALUES (1, 'Architecte diplômé d''État');

--
-- TOC entry 2059 (class 0 OID 16728)
-- Dependencies: 188
-- Data for Name: payment_type; Type: TABLE DATA; Schema: weflat; Owner: postgres
--

INSERT INTO payment_type VALUES (1, 'Lydia');
INSERT INTO payment_type VALUES (2, 'Transfert bancaire');


--
-- TOC entry 2049 (class 0 OID 16595)
-- Dependencies: 178
-- Data for Name: position; Type: TABLE DATA; Schema: weflat; Owner: postgres
--

INSERT INTO "position" VALUES (2, 'Sol', true);
INSERT INTO "position" VALUES (1, 'Mur', true);
INSERT INTO "position" VALUES (4, 'Plomberie', true);
INSERT INTO "position" VALUES (3, 'Electricité', true);
INSERT INTO "position" VALUES (6, 'Sanitaires', true);
INSERT INTO "position" VALUES (5, 'Menuiserie', true);
INSERT INTO "position" VALUES (8, 'Plafond', true);
INSERT INTO "position" VALUES (7, 'Cuisine', true);
INSERT INTO "position" VALUES (10, 'Autres', false);
INSERT INTO "position" VALUES (9, 'Platerie', true);


--
-- TOC entry 2069 (class 0 OID 0)
-- Dependencies: 179
-- Name: renovation_id_seq; Type: SEQUENCE SET; Schema: weflat; Owner: sa
--

SELECT pg_catalog.setval('renovation_id_seq', 1, true);

--
-- TOC entry 2070 (class 0 OID 0)
-- Dependencies: 181
-- Name: report_id_seq; Type: SEQUENCE SET; Schema: weflat; Owner: sa
--

SELECT pg_catalog.setval('report_id_seq', 1, true);


--
-- TOC entry 2042 (class 0 OID 16562)
-- Dependencies: 171
-- Data for Name: user; Type: TABLE DATA; Schema: weflat; Owner: sa
--



--
-- TOC entry 2071 (class 0 OID 0)
-- Dependencies: 170
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: weflat; Owner: sa
--

SELECT pg_catalog.setval('user_id_seq', 1, true);


--
-- TOC entry 2072 (class 0 OID 0)
-- Dependencies: 184
-- Name: visit_id_seq; Type: SEQUENCE SET; Schema: weflat; Owner: sa
--

SELECT pg_catalog.setval('visit_id_seq', 1, true);


--
-- TOC entry 2073 (class 0 OID 0)
-- Dependencies: 186
-- Name: zip_code_id_seq; Type: SEQUENCE SET; Schema: weflat; Owner: sa
--

SELECT pg_catalog.setval('zip_code_id_seq', 1, true);


--
-- TOC entry 1890 (class 2606 OID 16629)
-- Name: customer_id_key; Type: CONSTRAINT; Schema: weflat; Owner: sa; Tablespace: 
--

ALTER TABLE ONLY customer
    ADD CONSTRAINT customer_id_key UNIQUE (id);


--
-- TOC entry 1892 (class 2606 OID 16631)
-- Name: architect_situation_pkey; Type: CONSTRAINT; Schema: weflat; Owner: sa; Tablespace: 
--

ALTER TABLE ONLY architect_situation
    ADD CONSTRAINT architect_situation_pkey PRIMARY KEY (id);


--
-- TOC entry 1894 (class 2606 OID 16633)
-- Name: architect_type_pkey; Type: CONSTRAINT; Schema: weflat; Owner: sa; Tablespace: 
--

ALTER TABLE ONLY architect_type
    ADD CONSTRAINT architect_type_pkey PRIMARY KEY (id);


--
-- TOC entry 1896 (class 2606 OID 16635)
-- Name: architect_id_key; Type: CONSTRAINT; Schema: weflat; Owner: sa; Tablespace: 
--

ALTER TABLE ONLY weflat.architect
    ADD CONSTRAINT architect_id_key UNIQUE (id);


--
-- TOC entry 1900 (class 2606 OID 16637)
-- Name: architect_visit_pkey; Type: CONSTRAINT; Schema: weflat; Owner: sa; Tablespace: 
--

ALTER TABLE ONLY weflat.architect_visit
    ADD CONSTRAINT architect_visit_pkey PRIMARY KEY (architect_id, visit_id);


--
-- TOC entry 1902 (class 2606 OID 16639)
-- Name: architect_zip_code_architect_id_zip_code_id_key; Type: CONSTRAINT; Schema: weflat; Owner: sa; Tablespace: 
--

ALTER TABLE ONLY weflat.architect_zip_code
    ADD CONSTRAINT architect_zip_code_architect_id_zip_code_id_key UNIQUE (architect_id, zip_code_id);


--
-- TOC entry 1904 (class 2606 OID 16641)
-- Name: architect_zip_code_pkey; Type: CONSTRAINT; Schema: weflat; Owner: sa; Tablespace: 
--

ALTER TABLE ONLY weflat.architect_zip_code
    ADD CONSTRAINT architect_zip_code_pkey PRIMARY KEY (architect_id, zip_code_id);


--
-- TOC entry 1921 (class 2606 OID 16732)
-- Name: payment_type_pkey; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY weflat.payment_type
    ADD CONSTRAINT payment_type_pkey PRIMARY KEY (id);


--
-- TOC entry 1915 (class 2606 OID 16643)
-- Name: pk_visit; Type: CONSTRAINT; Schema: weflat; Owner: sa; Tablespace: 
--

ALTER TABLE ONLY weflat.visit
    ADD CONSTRAINT pk_visit PRIMARY KEY (id);


--
-- TOC entry 1906 (class 2606 OID 16645)
-- Name: position_pkey; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY weflat.position
    ADD CONSTRAINT position_pkey PRIMARY KEY (id);


--
-- TOC entry 1910 (class 2606 OID 16647)
-- Name: renovation_pkey; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY weflat.renovation
    ADD CONSTRAINT renovation_pkey PRIMARY KEY (id);


--
-- TOC entry 1912 (class 2606 OID 16649)
-- Name: report_pkey; Type: CONSTRAINT; Schema: weflat; Owner: sa; Tablespace: 
--

ALTER TABLE ONLY weflat.report
    ADD CONSTRAINT report_pkey PRIMARY KEY (id);


--
-- TOC entry 1884 (class 2606 OID 16651)
-- Name: user_id_key; Type: CONSTRAINT; Schema: weflat; Owner: sa; Tablespace: 
--

ALTER TABLE ONLY weflat.user
    ADD CONSTRAINT user_id_key UNIQUE (id);


--
-- TOC entry 1886 (class 2606 OID 16653)
-- Name: user_pkey; Type: CONSTRAINT; Schema: weflat; Owner: sa; Tablespace: 
--

ALTER TABLE ONLY weflat.user
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 1888 (class 2606 OID 16655)
-- Name: user_uq_email; Type: CONSTRAINT; Schema: weflat; Owner: sa; Tablespace: 
--

ALTER TABLE ONLY weflat.user
    ADD CONSTRAINT user_uq_email UNIQUE (email);


--
-- TOC entry 1917 (class 2606 OID 16657)
-- Name: zip_code_number_key; Type: CONSTRAINT; Schema: weflat; Owner: sa; Tablespace: 
--

ALTER TABLE ONLY weflat.zip_code
    ADD CONSTRAINT zip_code_number_key UNIQUE (number);


--
-- TOC entry 1919 (class 2606 OID 16659)
-- Name: zip_code_pkey; Type: CONSTRAINT; Schema: weflat; Owner: sa; Tablespace: 
--

ALTER TABLE ONLY weflat.zip_code
    ADD CONSTRAINT zip_code_pkey PRIMARY KEY (id);


--
-- TOC entry 1897 (class 1259 OID 16660)
-- Name: fki_fk_architect_architect_situation_id; Type: INDEX; Schema: weflat; Owner: sa; Tablespace: 
--

CREATE INDEX fki_fk_architect_architect_situation_id ON architect USING btree (architect_situation_id);


--
-- TOC entry 1898 (class 1259 OID 16661)
-- Name: fki_fk_architect_architect_type_id; Type: INDEX; Schema: weflat; Owner: sa; Tablespace: 
--

CREATE INDEX fki_fk_architect_architect_type_id ON architect USING btree (architect_type_id);


--
-- TOC entry 1907 (class 1259 OID 16662)
-- Name: fki_fk_renovation_position_id; Type: INDEX; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE INDEX fki_fk_renovation_position_id ON renovation USING btree (position_id);


--
-- TOC entry 1908 (class 1259 OID 16663)
-- Name: fki_fk_renovation_report_id; Type: INDEX; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE INDEX fki_fk_renovation_report_id ON renovation USING btree (report_id);


--
-- TOC entry 1913 (class 1259 OID 16664)
-- Name: fki_fk_visit_report_id; Type: INDEX; Schema: weflat; Owner: sa; Tablespace: 
--

CREATE INDEX fki_fk_visit_report_id ON visit USING btree (report_id);


--
-- TOC entry 1922 (class 2606 OID 16665)
-- Name: fk_architect_architect_situation_id; Type: FK CONSTRAINT; Schema: weflat; Owner: sa
--

ALTER TABLE ONLY architect
    ADD CONSTRAINT fk_architect_architect_situation_id FOREIGN KEY (architect_situation_id) REFERENCES architect_situation(id);


--
-- TOC entry 1923 (class 2606 OID 16670)
-- Name: fk_architect_architect_type_id; Type: FK CONSTRAINT; Schema: weflat; Owner: sa
--

ALTER TABLE ONLY architect
    ADD CONSTRAINT fk_architect_architect_type_id FOREIGN KEY (architect_type_id) REFERENCES architect_type(id);


--
-- TOC entry 1927 (class 2606 OID 16675)
-- Name: fk_architect_architect_id; Type: FK CONSTRAINT; Schema: weflat; Owner: sa
--

ALTER TABLE ONLY architect_zip_code
    ADD CONSTRAINT fk_architect_architect_id FOREIGN KEY (architect_id) REFERENCES architect(id);


--
-- TOC entry 1925 (class 2606 OID 16680)
-- Name: fk_architect_architect_id; Type: FK CONSTRAINT; Schema: weflat; Owner: sa
--

ALTER TABLE ONLY architect_visit
    ADD CONSTRAINT fk_architect_architect_id FOREIGN KEY (architect_id) REFERENCES architect(id);


--
-- TOC entry 1924 (class 2606 OID 16742)
-- Name: fk_architect_payment_type_id; Type: FK CONSTRAINT; Schema: weflat; Owner: sa
--

ALTER TABLE ONLY architect
    ADD CONSTRAINT fk_architect_payment_type_id FOREIGN KEY (payment_type_id) REFERENCES payment_type(id);


--
-- TOC entry 1926 (class 2606 OID 16685)
-- Name: fk_architect_visit_visit_id; Type: FK CONSTRAINT; Schema: weflat; Owner: sa
--

ALTER TABLE ONLY architect_visit
    ADD CONSTRAINT fk_architect_visit_visit_id FOREIGN KEY (visit_id) REFERENCES visit(id);


--
-- TOC entry 1928 (class 2606 OID 16690)
-- Name: fk_architect_zip_code_zip_code_id; Type: FK CONSTRAINT; Schema: weflat; Owner: sa
--

ALTER TABLE ONLY architect_zip_code
    ADD CONSTRAINT fk_architect_zip_code_zip_code_id FOREIGN KEY (zip_code_id) REFERENCES zip_code(id);


--
-- TOC entry 1929 (class 2606 OID 16695)
-- Name: fk_renovation_position_id; Type: FK CONSTRAINT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY renovation
    ADD CONSTRAINT fk_renovation_position_id FOREIGN KEY (position_id) REFERENCES "position"(id);


--
-- TOC entry 1930 (class 2606 OID 16700)
-- Name: fk_renovation_report_id; Type: FK CONSTRAINT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY renovation
    ADD CONSTRAINT fk_renovation_report_id FOREIGN KEY (report_id) REFERENCES report(id);


--
-- TOC entry 1931 (class 2606 OID 16705)
-- Name: fk_visit_customer_id; Type: FK CONSTRAINT; Schema: weflat; Owner: sa
--

ALTER TABLE ONLY visit
    ADD CONSTRAINT fk_visit_customer_id FOREIGN KEY (customer_id) REFERENCES customer(id);


--
-- TOC entry 1932 (class 2606 OID 16710)
-- Name: fk_visit_architect_id; Type: FK CONSTRAINT; Schema: weflat; Owner: sa
--

ALTER TABLE ONLY visit
    ADD CONSTRAINT fk_visit_architect_id FOREIGN KEY (architect_id) REFERENCES architect(id);


--
-- TOC entry 1933 (class 2606 OID 16715)
-- Name: fk_visit_report_id; Type: FK CONSTRAINT; Schema: weflat; Owner: sa
--

ALTER TABLE ONLY visit
    ADD CONSTRAINT fk_visit_report_id FOREIGN KEY (report_id) REFERENCES report(id);


--
-- TOC entry 1934 (class 2606 OID 16747)
-- Name: fk_visit_zip_code_id; Type: FK CONSTRAINT; Schema: weflat; Owner: sa
--

ALTER TABLE ONLY visit
    ADD CONSTRAINT fk_visit_zip_code_id FOREIGN KEY (zip_code_id) REFERENCES zip_code(id);


--
-- TOC entry 2066 (class 0 OID 0)
-- Dependencies: 7
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- TOC entry 2067 (class 0 OID 0)
-- Dependencies: 8
-- Name: weflat; Type: ACL; Schema: -; Owner: sa
--

REVOKE ALL ON SCHEMA weflat FROM PUBLIC;
REVOKE ALL ON SCHEMA weflat FROM sa;
GRANT ALL ON SCHEMA weflat TO sa;
GRANT ALL ON SCHEMA weflat TO postgres;


-- Completed on 2018-05-04 20:48:05

--
-- PostgreSQL database dump complete
--


