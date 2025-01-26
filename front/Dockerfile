# Etapa 1: Construcción de la aplicación Node.js
FROM cgr.dev/chainguard/node as build

ENV NODE_ENV=production

COPY --chown=node:node ["./", "/app/"]


WORKDIR /app

RUN npm install --legacy-peer-deps

RUN npm run build

# Etapa 2: Configuración de Nginx
FROM cgr.dev/chainguard/nginx:latest

# Copiar la aplicación construida desde la etapa anterior
COPY --from=build /app/build /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY ./nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 8080 para Nginx
EXPOSE 8080