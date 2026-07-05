--
-- PostgreSQL database dump
--

\restrict lIDyiXSNKJHXetsSBsgGENWWrKPEaRsNjPiL92T0IJzVPl4Vp3NwHO7pUQn5VUj

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-06 00:25:39

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 18469)
-- Name: chat_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_history (
    id integer NOT NULL,
    user_id integer,
    query text,
    response text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.chat_history OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 18468)
-- Name: chat_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chat_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.chat_history_id_seq OWNER TO postgres;

--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 221
-- Name: chat_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chat_history_id_seq OWNED BY public.chat_history.id;


--
-- TOC entry 226 (class 1259 OID 18501)
-- Name: documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.documents (
    id integer NOT NULL,
    filename character varying(255) NOT NULL,
    filetype character varying(100),
    filepath text NOT NULL,
    uploaded_by integer,
    upload_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    title character varying(255)
);


ALTER TABLE public.documents OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 18500)
-- Name: documents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.documents_id_seq OWNER TO postgres;

--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 225
-- Name: documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.documents_id_seq OWNED BY public.documents.id;


--
-- TOC entry 224 (class 1259 OID 18485)
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer,
    session_token text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 18484)
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sessions_id_seq OWNER TO postgres;

--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 223
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- TOC entry 220 (class 1259 OID 18434)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(50) DEFAULT 'user'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 18433)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4874 (class 2604 OID 18472)
-- Name: chat_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_history ALTER COLUMN id SET DEFAULT nextval('public.chat_history_id_seq'::regclass);


--
-- TOC entry 4878 (class 2604 OID 18504)
-- Name: documents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents ALTER COLUMN id SET DEFAULT nextval('public.documents_id_seq'::regclass);


--
-- TOC entry 4876 (class 2604 OID 18488)
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- TOC entry 4871 (class 2604 OID 18437)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5043 (class 0 OID 18469)
-- Dependencies: 222
-- Data for Name: chat_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chat_history (id, user_id, query, response, created_at) FROM stdin;
27	10	hello?	This is a sample response. RAG integration will be added later.	2026-07-05 14:19:01.26863
29	17	hello?	This is a sample response. RAG integration will be added later.	2026-07-05 14:45:55.133218
30	17	what about you?	This is a sample response. RAG integration will be added later.	2026-07-05 14:46:06.991135
\.


--
-- TOC entry 5047 (class 0 OID 18501)
-- Dependencies: 226
-- Data for Name: documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.documents (id, filename, filetype, filepath, uploaded_by, upload_date, title) FROM stdin;
14	water-18-00369-v3.pdf	application/pdf	uploads\\1783229923060.pdf	2	2026-07-05 11:08:43.327698	research3
15	s12145-025-01813-0.pdf	application/pdf	uploads\\1783242826945.pdf	2	2026-07-05 14:43:47.153007	research4
\.


--
-- TOC entry 5045 (class 0 OID 18485)
-- Dependencies: 224
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, user_id, session_token, created_at) FROM stdin;
\.


--
-- TOC entry 5041 (class 0 OID 18434)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, role, created_at) FROM stdin;
2	admin	admin@gmail.com	$2b$10$1XnOZ7EIBIRU8GI.nclS9.82frB.7fXp/wm0ZlLhkMwkoqNcY9Xme	admin	2026-06-30 06:44:44.443149
10	user7	user7@gmail.com	$2b$10$oBfy922LJpa2sM.PFb/kk.6AVzhUHFbseI0HBdLsUrcuPrAPWndk.	user	2026-07-04 19:51:52.078003
17	user1	user1@gmail.com	$2b$10$gg3v8py13Jv09JDS43Q0jexwt0p7zjgH.C..eIRKsjBYCqEb1naXW	user	2026-07-05 14:44:43.776796
\.


--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 221
-- Name: chat_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chat_history_id_seq', 30, true);


--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 225
-- Name: documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.documents_id_seq', 15, true);


--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 223
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 1, false);


--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 17, true);


--
-- TOC entry 4885 (class 2606 OID 18478)
-- Name: chat_history chat_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_history
    ADD CONSTRAINT chat_history_pkey PRIMARY KEY (id);


--
-- TOC entry 4889 (class 2606 OID 18512)
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


--
-- TOC entry 4887 (class 2606 OID 18494)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 4881 (class 2606 OID 18449)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4883 (class 2606 OID 18447)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4890 (class 2606 OID 18479)
-- Name: chat_history chat_history_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_history
    ADD CONSTRAINT chat_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4892 (class 2606 OID 18513)
-- Name: documents documents_uploaded_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.users(id);


--
-- TOC entry 4891 (class 2606 OID 18495)
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2026-07-06 00:25:40

--
-- PostgreSQL database dump complete
--

\unrestrict lIDyiXSNKJHXetsSBsgGENWWrKPEaRsNjPiL92T0IJzVPl4Vp3NwHO7pUQn5VUj

