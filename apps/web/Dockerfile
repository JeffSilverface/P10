FROM node:24-alpine
WORKDIR /repo
RUN corepack enable
COPY . .
RUN pnpm install --frozen-lockfile
WORKDIR /repo/apps/web
RUN pnpm run build

EXPOSE 3000
CMD ["pnpm", "run", "start"]
