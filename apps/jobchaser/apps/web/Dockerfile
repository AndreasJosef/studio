# BUILD STAGE
FROM node:24-slim AS builder
RUN corepack enable
WORKDIR /app

# Caching Layer
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/jobchaser/apps/web/package.json ./apps/jobchaser/apps/web/
COPY apps/jobchaser/packages/domain/package.json ./apps/jobchaser/packages/domain/

RUN pnpm install --frozen-lockfile

# Build
COPY . .
RUN pnpm --filter @jobchaser/web build

# SERVE STAGE 
FROM node:24-slim
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/apps/jobchaser/apps/web/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
