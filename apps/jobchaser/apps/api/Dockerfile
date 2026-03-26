FROM node:24-slim AS base
RUN corepack enable
WORKDIR /app

# Copy all workspace metadata and shared packages
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/jobchaser/package.json ./apps/jobchaser/
COPY packages ./packages
COPY apps/jobchaser/packages ./apps/jobchaser/packages
COPY apps/jobchaser/apps/api ./apps/jobchaser/apps/api

RUN pnpm install --frozen-lockfile

# Build the API otherwise skip)
RUN pnpm --filter @jobchaser/api build || true

EXPOSE 4000
# Run the API
CMD ["node", "apps/jobchaser/apps/api/src/index.ts"]
