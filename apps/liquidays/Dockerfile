FROM node:24-slim AS builder
RUN corepack enable
WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/liquidays/package.json ./apps/liquidays/

RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm --filter liquidays build

FROM node:24-slim
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/apps/liquidays/dist ./dist

EXPOSE 3001
CMD ["serve", "-s", "dist", "-l", "3001"]
