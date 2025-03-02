# Etapa 1: Construcción de la aplicación Node.js
FROM cgr.dev/chainguard/node as build

ENV NODE_ENV=production

COPY --chown=node:node ["./", "/app/"]

WORKDIR /app

RUN npm install
RUN npm run build

# Etapa 2: Configuración de Nginx
FROM cgr.dev/chainguard/nginx:latest

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080