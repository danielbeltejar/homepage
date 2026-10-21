# Etapa 1: Construcción de Astro SSR
FROM cgr.dev/chainguard/node:latest-dev AS build

ENV NODE_ENV=production
WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node packages/america-ui ./packages/america-ui
RUN npm ci --include=dev

COPY --chown=node:node . .
RUN npm run build
RUN npm prune --omit=dev

# Etapa 2: Runtime Node mínimo para el adapter standalone
FROM cgr.dev/chainguard/node:latest

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080
WORKDIR /app

COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/packages/america-ui ./packages/america-ui

EXPOSE 8080

CMD ["./dist/server/entry.mjs"]
