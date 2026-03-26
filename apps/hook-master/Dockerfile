# --- Stage 1: Build/Install ---
FROM node:24-slim AS builder

# Aktivera pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Kopiera endast filer som behövs för installation (för bättre caching)
COPY package.json pnpm-lock.yaml* ./

# Installera beroenden
RUN pnpm install --no-frozen-lockfile --production

# Kopiera resten av koden
COPY . .

# --- Stage 2: Runtime ---
FROM node:24-slim AS runner

WORKDIR /app

# Kopiera över node_modules och koden från builder-stadiet
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

# Exponera porten din index.js lyssnar på (t.ex. 5000)
EXPOSE 5000

# Kör appen
CMD ["node", "index.js"]
