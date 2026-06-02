# BUILD STAGE (no serve stage — Caddy serves static files on the VPS)
FROM node:24-slim AS builder
RUN corepack enable
WORKDIR /app

# Caching Layer
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/andreasjosef/package.json ./apps/andreasjosef/

RUN pnpm install --frozen-lockfile

# Build
COPY . .
RUN pnpm --filter @studio/andreasjosef build

# No serve stage — Caddy serves dist/ directly on the VPS
# Usage:
#   podman run --rm aj-site:latest tar -cC /app/apps/andreasjosef/dist . | tar -xC /var/www/andreasjosef/