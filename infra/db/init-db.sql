-- Create the user
CREATE USER jc_user WITH PASSWORD 'jc_password_placeholder';

-- Create the database and assign the owner immediately
CREATE DATABASE jobchaser_db OWNER jc_user;

-- Connect to it to fix the schema (if using psql)
\c jobchaser_db
ALTER SCHEMA public OWNER TO jc_user;

