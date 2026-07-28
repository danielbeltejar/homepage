# Etapa 1: Construcción de la aplicación Node.js
FROM mirror.gcr.io/library/node:22-slim AS build

ENV NODE_ENV=production

COPY --chown=node:node ["./", "/app/"]

WORKDIR /app

RUN npm install
RUN npm run build

# Etapa 2: Configuración de Nginx
FROM mirror.gcr.io/library/nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /run/nginx /var/cache/nginx /var/log/nginx \
    && chown -R 101:101 /run/nginx /var/cache/nginx /var/log/nginx /usr/share/nginx/html
USER 101

EXPOSE 8080
