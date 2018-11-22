CREATE USER weflat WITH
                LOGIN
                NOSUPERUSER
                NOCREATEDB
                NOCREATEROLE
                INHERIT
                NOREPLICATION
                CONNECTION LIMIT -1
                PASSWORD 'dhainea;1337';



--
-- PostgreSQL database dump
--

-- Dumped from database version 9.2.24
-- Dumped by pg_dump version 9.2.24
-- Started on 2018-11-17 23:35:29

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 7 (class 2615 OID 18470)
-- Name: weflat; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA weflat;


ALTER SCHEMA weflat OWNER TO weflat;

SET search_path = weflat, pg_catalog;

--
-- TOC entry 170 (class 1259 OID 18471)
-- Name: user_id_seq; Type: SEQUENCE; Schema: weflat; Owner: postgres
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE weflat.user_id_seq OWNER TO weflat;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 171 (class 1259 OID 18473)
-- Name: user; Type: TABLE; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE TABLE "user" (
    id integer DEFAULT nextval('user_id_seq'::regclass) NOT NULL,
    last_name character varying(50),
    first_name character varying(50),
    birth_date date,
    telephone character varying,
    email character varying,
    password character varying
);


ALTER TABLE weflat."user" OWNER TO weflat;

--
-- TOC entry 172 (class 1259 OID 18480)
-- Name: admin; Type: TABLE; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE TABLE admin (
)
INHERITS ("user");


ALTER TABLE weflat.admin OWNER TO weflat;

--
-- TOC entry 173 (class 1259 OID 18487)
-- Name: architect; Type: TABLE; Schema: weflat; Owner: postgres; Tablespace: 
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
INHERITS ("user");


ALTER TABLE weflat.architect OWNER TO weflat;

--
-- TOC entry 174 (class 1259 OID 18494)
-- Name: architect_situation; Type: TABLE; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE TABLE architect_situation (
    id integer NOT NULL,
    label character varying(100)
);


ALTER TABLE weflat.architect_situation OWNER TO weflat;

--
-- TOC entry 175 (class 1259 OID 18497)
-- Name: architect_type; Type: TABLE; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE TABLE architect_type (
    id integer NOT NULL,
    label character varying(100)
);


ALTER TABLE weflat.architect_type OWNER TO weflat;

--
-- TOC entry 176 (class 1259 OID 18500)
-- Name: architect_visit; Type: TABLE; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE TABLE architect_visit (
    architect_id integer NOT NULL,
    visit_id integer NOT NULL
);


ALTER TABLE weflat.architect_visit OWNER TO weflat;

--
-- TOC entry 177 (class 1259 OID 18503)
-- Name: architect_zip_code; Type: TABLE; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE TABLE architect_zip_code (
    architect_id integer NOT NULL,
    zip_code_id integer NOT NULL
);


ALTER TABLE weflat.architect_zip_code OWNER TO weflat;

--
-- TOC entry 178 (class 1259 OID 18506)
-- Name: customer; Type: TABLE; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE TABLE customer (
    project text
)
INHERITS ("user");


ALTER TABLE weflat.customer OWNER TO weflat;

--
-- TOC entry 179 (class 1259 OID 18513)
-- Name: password_change_request_id_seq; Type: SEQUENCE; Schema: weflat; Owner: postgres
--

CREATE SEQUENCE password_change_request_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE weflat.password_change_request_id_seq OWNER TO weflat;

--
-- TOC entry 180 (class 1259 OID 18515)
-- Name: password_change_request; Type: TABLE; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE TABLE password_change_request (
    id integer DEFAULT nextval('password_change_request_id_seq'::regclass) NOT NULL,
    user_id integer NOT NULL,
    hash character varying NOT NULL,
    expiration_date timestamp without time zone
);


ALTER TABLE weflat.password_change_request OWNER TO weflat;

--
-- TOC entry 181 (class 1259 OID 18522)
-- Name: payment_type; Type: TABLE; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE TABLE payment_type (
    id integer NOT NULL,
    label character varying(100)
);


ALTER TABLE weflat.payment_type OWNER TO weflat;

--
-- TOC entry 182 (class 1259 OID 18525)
-- Name: position; Type: TABLE; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE TABLE "position" (
    id integer NOT NULL,
    label character varying(100) NOT NULL,
    mandatory boolean
);


ALTER TABLE weflat."position" OWNER TO weflat;

--
-- TOC entry 183 (class 1259 OID 18528)
-- Name: renovation_id_seq; Type: SEQUENCE; Schema: weflat; Owner: postgres
--

CREATE SEQUENCE renovation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE weflat.renovation_id_seq OWNER TO weflat;

--
-- TOC entry 184 (class 1259 OID 18530)
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


ALTER TABLE weflat.renovation OWNER TO weflat;

--
-- TOC entry 185 (class 1259 OID 18537)
-- Name: report_id_seq; Type: SEQUENCE; Schema: weflat; Owner: postgres
--

CREATE SEQUENCE report_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE weflat.report_id_seq OWNER TO weflat;

--
-- TOC entry 186 (class 1259 OID 18539)
-- Name: report; Type: TABLE; Schema: weflat; Owner: postgres; Tablespace: 
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


ALTER TABLE weflat.report OWNER TO weflat;

--
-- TOC entry 187 (class 1259 OID 18546)
-- Name: visit; Type: TABLE; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE TABLE visit (
    id integer NOT NULL,
    customer_id integer,
    city character varying(50) NOT NULL,
    architect_id integer,
    zip_code_id integer NOT NULL,
    street_number character varying(10),
    route character varying(100),
    creation_date timestamp(6) with time zone NOT NULL,
    visit_date timestamp(6) with time zone,
    report_id integer,
    status integer,
    announcement_url character varying(2000),
    charge_id character varying(50),
    customer_paid_amount integer,
    refunded_amount integer,
    architect_paid_amount integer
);


ALTER TABLE weflat.visit OWNER TO weflat;

--
-- TOC entry 188 (class 1259 OID 18549)
-- Name: visit_id_seq; Type: SEQUENCE; Schema: weflat; Owner: postgres
--

CREATE SEQUENCE visit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE weflat.visit_id_seq OWNER TO weflat;

--
-- TOC entry 189 (class 1259 OID 18551)
-- Name: zip_code; Type: TABLE; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE TABLE zip_code (
    id integer NOT NULL,
    number character(5) NOT NULL,
    active boolean,
    county character varying,
    town character varying,
    latitude double precision,
    longitude double precision
);


ALTER TABLE weflat.zip_code OWNER TO weflat;

--
-- TOC entry 190 (class 1259 OID 18557)
-- Name: zip_code_id_seq; Type: SEQUENCE; Schema: weflat; Owner: postgres
--

CREATE SEQUENCE zip_code_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE weflat.zip_code_id_seq OWNER TO weflat;

--
-- TOC entry 2807 (class 2604 OID 18559)
-- Name: id; Type: DEFAULT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY admin ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- TOC entry 2808 (class 2604 OID 18560)
-- Name: id; Type: DEFAULT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY architect ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- TOC entry 2809 (class 2604 OID 18561)
-- Name: id; Type: DEFAULT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY customer ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- TOC entry 2976 (class 0 OID 18480)
-- Dependencies: 172
-- Data for Name: admin; Type: TABLE DATA; Schema: weflat; Owner: postgres
--

INSERT INTO admin VALUES (1, 'Weflat', 'Admin', NULL, NULL, 'contact@weflat.fr', 'yqsyJZHV4HqFhOceoHyA62+VZIoVl8MjXtHK2sZtqSceR0smfjoLSpUpJS0XO6DE');


--
-- TOC entry 2978 (class 0 OID 18494)
-- Dependencies: 174
-- Data for Name: architect_situation; Type: TABLE DATA; Schema: weflat; Owner: postgres
--

INSERT INTO architect_situation VALUES (2, 'Libéral HMONP/DPLG');
INSERT INTO architect_situation VALUES (1, 'Salarié');
INSERT INTO architect_situation VALUES (3, 'Architecte d''intérieur indépendant');


--
-- TOC entry 2979 (class 0 OID 18497)
-- Dependencies: 175
-- Data for Name: architect_type; Type: TABLE DATA; Schema: weflat; Owner: postgres
--

INSERT INTO architect_type VALUES (2, 'Architecte d''intérieur');
INSERT INTO architect_type VALUES (1, 'Architecte diplômé d''État');


--
-- TOC entry 2999 (class 0 OID 0)
-- Dependencies: 179
-- Name: password_change_request_id_seq; Type: SEQUENCE SET; Schema: weflat; Owner: postgres
--

SELECT pg_catalog.setval('password_change_request_id_seq', 1, true);


--
-- TOC entry 2985 (class 0 OID 18522)
-- Dependencies: 181
-- Data for Name: payment_type; Type: TABLE DATA; Schema: weflat; Owner: postgres
--

INSERT INTO payment_type VALUES (1, 'Lydia');
INSERT INTO payment_type VALUES (2, 'Transfert bancaire');


--
-- TOC entry 2986 (class 0 OID 18525)
-- Dependencies: 182
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
INSERT INTO "position" VALUES (9, 'Platerie', true);



--
-- TOC entry 3000 (class 0 OID 0)
-- Dependencies: 183
-- Name: renovation_id_seq; Type: SEQUENCE SET; Schema: weflat; Owner: postgres
--

SELECT pg_catalog.setval('renovation_id_seq', 1, true);


--
-- TOC entry 3001 (class 0 OID 0)
-- Dependencies: 185
-- Name: report_id_seq; Type: SEQUENCE SET; Schema: weflat; Owner: postgres
--

SELECT pg_catalog.setval('report_id_seq', 1, true);


--
-- TOC entry 2975 (class 0 OID 18473)
-- Dependencies: 171
-- Data for Name: user; Type: TABLE DATA; Schema: weflat; Owner: postgres
--



--
-- TOC entry 3002 (class 0 OID 0)
-- Dependencies: 170
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: weflat; Owner: postgres
--

SELECT pg_catalog.setval('user_id_seq', 1, true);


--
-- TOC entry 3003 (class 0 OID 0)
-- Dependencies: 188
-- Name: visit_id_seq; Type: SEQUENCE SET; Schema: weflat; Owner: postgres
--

SELECT pg_catalog.setval('visit_id_seq', 1, true);


--
-- TOC entry 3004 (class 0 OID 0)
-- Dependencies: 190
-- Name: zip_code_id_seq; Type: SEQUENCE SET; Schema: weflat; Owner: postgres
--

SELECT pg_catalog.setval('zip_code_id_seq', 1, true);


--
-- TOC entry 2820 (class 2606 OID 18563)
-- Name: architect_id_key; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY architect
    ADD CONSTRAINT architect_id_key UNIQUE (id);


--
-- TOC entry 2824 (class 2606 OID 18565)
-- Name: architect_situation_pkey; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY architect_situation
    ADD CONSTRAINT architect_situation_pkey PRIMARY KEY (id);


--
-- TOC entry 2826 (class 2606 OID 18567)
-- Name: architect_type_pkey; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY architect_type
    ADD CONSTRAINT architect_type_pkey PRIMARY KEY (id);


--
-- TOC entry 2828 (class 2606 OID 18569)
-- Name: architect_visit_pkey; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY architect_visit
    ADD CONSTRAINT architect_visit_pkey PRIMARY KEY (architect_id, visit_id);


--
-- TOC entry 2830 (class 2606 OID 18571)
-- Name: architect_zip_code_architect_id_zip_code_id_key; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY architect_zip_code
    ADD CONSTRAINT architect_zip_code_architect_id_zip_code_id_key UNIQUE (architect_id, zip_code_id);


--
-- TOC entry 2832 (class 2606 OID 18573)
-- Name: architect_zip_code_pkey; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY architect_zip_code
    ADD CONSTRAINT architect_zip_code_pkey PRIMARY KEY (architect_id, zip_code_id);


--
-- TOC entry 2834 (class 2606 OID 18575)
-- Name: customer_id_key; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY customer
    ADD CONSTRAINT customer_id_key UNIQUE (id);


--
-- TOC entry 2836 (class 2606 OID 18577)
-- Name: password_change_request_pkey; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY password_change_request
    ADD CONSTRAINT password_change_request_pkey PRIMARY KEY (id);


--
-- TOC entry 2838 (class 2606 OID 18579)
-- Name: payment_type_pkey; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY payment_type
    ADD CONSTRAINT payment_type_pkey PRIMARY KEY (id);


--
-- TOC entry 2849 (class 2606 OID 18581)
-- Name: pk_visit; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY visit
    ADD CONSTRAINT pk_visit PRIMARY KEY (id);


--
-- TOC entry 2840 (class 2606 OID 18583)
-- Name: position_pkey; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "position"
    ADD CONSTRAINT position_pkey PRIMARY KEY (id);


--
-- TOC entry 2844 (class 2606 OID 18585)
-- Name: renovation_pkey; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY renovation
    ADD CONSTRAINT renovation_pkey PRIMARY KEY (id);


--
-- TOC entry 2846 (class 2606 OID 18587)
-- Name: report_pkey; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY report
    ADD CONSTRAINT report_pkey PRIMARY KEY (id);


--
-- TOC entry 2814 (class 2606 OID 18589)
-- Name: user_id_key; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_id_key UNIQUE (id);


--
-- TOC entry 2816 (class 2606 OID 18591)
-- Name: user_pkey; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2818 (class 2606 OID 18593)
-- Name: user_uq_email; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_uq_email UNIQUE (email);


--
-- TOC entry 2852 (class 2606 OID 18595)
-- Name: zip_code_number_key; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY zip_code
    ADD CONSTRAINT zip_code_number_key UNIQUE (number);


--
-- TOC entry 2854 (class 2606 OID 18597)
-- Name: zip_code_pkey; Type: CONSTRAINT; Schema: weflat; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY zip_code
    ADD CONSTRAINT zip_code_pkey PRIMARY KEY (id);


--
-- TOC entry 2821 (class 1259 OID 18598)
-- Name: fki_fk_architect_architect_situation_id; Type: INDEX; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE INDEX fki_fk_architect_architect_situation_id ON architect USING btree (architect_situation_id);


--
-- TOC entry 2822 (class 1259 OID 18599)
-- Name: fki_fk_architect_architect_type_id; Type: INDEX; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE INDEX fki_fk_architect_architect_type_id ON architect USING btree (architect_type_id);


--
-- TOC entry 2841 (class 1259 OID 18600)
-- Name: fki_fk_renovation_position_id; Type: INDEX; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE INDEX fki_fk_renovation_position_id ON renovation USING btree (position_id);


--
-- TOC entry 2842 (class 1259 OID 18601)
-- Name: fki_fk_renovation_report_id; Type: INDEX; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE INDEX fki_fk_renovation_report_id ON renovation USING btree (report_id);


--
-- TOC entry 2847 (class 1259 OID 18602)
-- Name: fki_fk_visit_report_id; Type: INDEX; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE INDEX fki_fk_visit_report_id ON visit USING btree (report_id);


--
-- TOC entry 2850 (class 1259 OID 18603)
-- Name: ix_zip_code_number; Type: INDEX; Schema: weflat; Owner: postgres; Tablespace: 
--

CREATE INDEX ix_zip_code_number ON zip_code USING btree (number bpchar_pattern_ops);


--
-- TOC entry 2860 (class 2606 OID 18604)
-- Name: fk_architect_architect_id; Type: FK CONSTRAINT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY architect_zip_code
    ADD CONSTRAINT fk_architect_architect_id FOREIGN KEY (architect_id) REFERENCES architect(id);


--
-- TOC entry 2858 (class 2606 OID 18609)
-- Name: fk_architect_architect_id; Type: FK CONSTRAINT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY architect_visit
    ADD CONSTRAINT fk_architect_architect_id FOREIGN KEY (architect_id) REFERENCES architect(id);


--
-- TOC entry 2855 (class 2606 OID 18614)
-- Name: fk_architect_architect_situation_id; Type: FK CONSTRAINT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY architect
    ADD CONSTRAINT fk_architect_architect_situation_id FOREIGN KEY (architect_situation_id) REFERENCES architect_situation(id);


--
-- TOC entry 2856 (class 2606 OID 18619)
-- Name: fk_architect_architect_type_id; Type: FK CONSTRAINT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY architect
    ADD CONSTRAINT fk_architect_architect_type_id FOREIGN KEY (architect_type_id) REFERENCES architect_type(id);


--
-- TOC entry 2857 (class 2606 OID 18624)
-- Name: fk_architect_payment_type_id; Type: FK CONSTRAINT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY architect
    ADD CONSTRAINT fk_architect_payment_type_id FOREIGN KEY (payment_type_id) REFERENCES payment_type(id);


--
-- TOC entry 2859 (class 2606 OID 18629)
-- Name: fk_architect_visit_visit_id; Type: FK CONSTRAINT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY architect_visit
    ADD CONSTRAINT fk_architect_visit_visit_id FOREIGN KEY (visit_id) REFERENCES visit(id);


--
-- TOC entry 2861 (class 2606 OID 18634)
-- Name: fk_architect_zip_code_zip_code_id; Type: FK CONSTRAINT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY architect_zip_code
    ADD CONSTRAINT fk_architect_zip_code_zip_code_id FOREIGN KEY (zip_code_id) REFERENCES zip_code(id);


--
-- TOC entry 2862 (class 2606 OID 18639)
-- Name: fk_renovation_position_id; Type: FK CONSTRAINT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY renovation
    ADD CONSTRAINT fk_renovation_position_id FOREIGN KEY (position_id) REFERENCES "position"(id);


--
-- TOC entry 2863 (class 2606 OID 18644)
-- Name: fk_renovation_report_id; Type: FK CONSTRAINT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY renovation
    ADD CONSTRAINT fk_renovation_report_id FOREIGN KEY (report_id) REFERENCES report(id);


--
-- TOC entry 2864 (class 2606 OID 18649)
-- Name: fk_visit_architect_id; Type: FK CONSTRAINT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY visit
    ADD CONSTRAINT fk_visit_architect_id FOREIGN KEY (architect_id) REFERENCES architect(id);


--
-- TOC entry 2865 (class 2606 OID 18654)
-- Name: fk_visit_customer_id; Type: FK CONSTRAINT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY visit
    ADD CONSTRAINT fk_visit_customer_id FOREIGN KEY (customer_id) REFERENCES customer(id);


--
-- TOC entry 2866 (class 2606 OID 18659)
-- Name: fk_visit_report_id; Type: FK CONSTRAINT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY visit
    ADD CONSTRAINT fk_visit_report_id FOREIGN KEY (report_id) REFERENCES report(id);


--
-- TOC entry 2867 (class 2606 OID 18664)
-- Name: fk_visit_zip_code_id; Type: FK CONSTRAINT; Schema: weflat; Owner: postgres
--

ALTER TABLE ONLY visit
    ADD CONSTRAINT fk_visit_zip_code_id FOREIGN KEY (zip_code_id) REFERENCES zip_code(id);


-- Completed on 2018-11-17 23:36:03

--
-- PostgreSQL database dump complete
--

