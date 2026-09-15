FROM node:24-alpine
WORKDIR /repo
RUN corepack enable
COPY . .
RUN pnpm install --frozen-lockfile
WORKDIR /repo/apps/api
RUN pnpm exec prisma generate
RUN pnpm run build

EXPOSE 3001
CMD ["sh", "-c", "pnpm exec prisma migrate deploy && pnpm run start:prod"]
