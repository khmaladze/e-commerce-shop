CREATE SCHEMA public;
SET search_path = public;

DROP TABLE IF EXISTS public.user CASCADE;
DROP TABLE IF EXISTS public.category CASCADE;
DROP TABLE IF EXISTS public.shop CASCADE;
DROP TABLE IF EXISTS public.product CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE OR REPLACE FUNCTION next_id(IN seq_name varchar, OUT result bigint) AS $$
DECLARE
    our_epoch bigint := 1314220021721;
    seq_id bigint;
    now_millis bigint;
    shard_id int := 0;
BEGIN
    SELECT nextval(seq_name) % 1024 INTO seq_id;
    SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
    result := (now_millis - our_epoch) << 23;
    result := result | (shard_id <<10);
    result := result | (seq_id);
END;
$$
LANGUAGE plpgsql;
-- DROP SEQUENCE IF EXISTS content_id_seq;
CREATE SEQUENCE org_id_seq;

CREATE TABLE public.user(
    user_id BIGSERIAL PRIMARY KEY, 
    first_name CHARACTER VARYING(50)  NOT NULL,
    last_name CHARACTER VARYING(100) NOT NULL,
    birth_date DATE NOT NULL,
	country CHARACTER VARYING(100) NOT NULL,
	user_address CHARACTER VARYING(100) NOT NULL,
    email CHARACTER VARYING(100) NOT NULL UNIQUE,
	user_password CHARACTER VARYING(60) NOT NULL,
	user_card CHARACTER VARYING(10) NOT NULL UNIQUE,
	card_password CHARACTER VARYING(60) NOT NULL,
	is_blocked BOOLEAN NOT NULL,
	budget CHARACTER VARYING(10) NOT NULL,
	permission CHARACTER VARYING(50) NOT NULL,
	user_image CHARACTER VARYING(500),
	ip_address CHARACTER VARYING(100) NOT NULL,
	browser_type CHARACTER VARYING(500) NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE public.category(
	category_id BIGSERIAL PRIMARY KEY,
	category CHARACTER VARYING(100) NOT NULL
);

INSERT INTO public.category(
	 category)
	VALUES 
	( 'ELECTRONICS'),
	( 'HOME'),
	( 'FASHION'),
	( 'SPORT'),
	( 'ITEM');

CREATE TABLE public.shop(
	shop_id BIGSERIAL PRIMARY KEY,
	shop_name CHARACTER VARYING(50) NOT NULL,
	shop_owner BIGINT NOT NULL UNIQUE,
	category BIGINT NOT NULL,
	is_blocked BOOLEAN NOT NULL,
	budget CHARACTER VARYING(50) NOT NULL,
	shop_image CHARACTER VARYING(500) NOT NULL,
	CONSTRAINT fkey_shop_shop_owner FOREIGN KEY(shop_owner)
	REFERENCES public.user(user_id) MATCH SIMPLE,
	CONSTRAINT fkey_shop_category FOREIGN KEY (category)
	REFERENCES public.category(category_id) MATCH SIMPLE 
	ON UPDATE NO ACTION
	ON DELETE NO ACTION
);



CREATE TABLE public.product(
	product_id BIGSERIAL PRIMARY KEY,
	title CHARACTER VARYING(30) NOT NULL,
	product_description CHARACTER VARYING(1000),
	product_image CHARACTER VARYING(5000) NOT NULL, 
	category BIGINT NOT NULL,
	price BIGINT NOT NULL,
	product_count BIGINT NOT NULL,
	posted_by_user BIGINT,
	posted_by_shop BIGINT ,
	is_blocked BOOLEAN NOT NULL,
	CONSTRAINT fkey_product_posted_by_user FOREIGN KEY (posted_by_shop)
	REFERENCES public.user(user_id) MATCH SIMPLE,
	CONSTRAINT fkey_product_posted_by_shop FOREIGN KEY(posted_by_shop)
	REFERENCES public.shop(shop_id) MATCH SIMPLE
	ON UPDATE NO ACTION
	ON DELETE NO ACTION
);

CREATE TABLE public.history(
	history_id BIGSERIAL PRIMARY KEY,
	product_id BIGINT NOT NULL,
	person_id BIGINT NOT NULL,
	CONSTRAINT fkey_history_product_id FOREIGN KEY(product_id)
	REFERENCES public.product(product_id) MATCH SIMPLE,
	CONSTRAINT fkey_history_person_id FOREIGN KEY(person_id)
	REFERENCES public.user(user_id) MATCH SIMPLE
	ON UPDATE NO ACTION
	ON DELETE NO ACTION
);