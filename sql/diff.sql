CREATE INDEX ix_zip_code_number
    ON weflat.zip_code USING btree
    ("number" COLLATE pg_catalog."default" bpchar_pattern_ops ASC NULLS LAST)
    TABLESPACE pg_default;