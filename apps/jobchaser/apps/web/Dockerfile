# Build Stage
FROM node:24-slim AS builder
RUN corepack enable
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @jobchaser/web build

# Serve Stage
FROM node:24-slim
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/apps/jobchaser/apps/web/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
