#!/bin/bash
set -e

# This script runs inside the container and uses the environment 
# variables passed via docker-compose/podman.

# JOBCHASER
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create JobChaser User and DB
    CREATE USER $JC_DB_USER WITH PASSWORD '$JC_DB_PASSWORD';
    CREATE DATABASE $JC_DB_NAME OWNER $JC_DB_USER;
EOSQL

# Grant Schema Ownership (Postgres 15+ fix)
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$JC_DB_NAME" <<-EOSQL
    ALTER SCHEMA public OWNER TO $JC_DB_USER;
EOSQL

