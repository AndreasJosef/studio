FROM node:24-slim
RUN corepack enable
WORKDIR /app

# Copy ONLY the files needed for pnpm install
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/jobchaser/package.json ./apps/jobchaser/
COPY packages ./packages
COPY apps/jobchaser/apps/api/package.json ./apps/jobchaser/apps/api/
COPY apps/jobchaser/packages/domain/package.json ./apps/jobchaser/packages/domain/

# Install everything (including dev deps needed for TS execution)
RUN pnpm install --frozen-lockfile

# Now copy the actual code. If code changes, pnpm install is SKIPPED.
COPY . .

EXPOSE 4000

# Run directly with Node 24's TS support
CMD ["node", "apps/jobchaser/apps/api/src/index.ts"]
