FROM mirror.gcr.io/library/node:22-slim AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

FROM mirror.gcr.io/library/nginx:stable-alpine

COPY --from=builder /app/build/ /build/
COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /run/nginx /var/cache/nginx /var/log/nginx \
    && chown -R 101:101 /run/nginx /var/cache/nginx /var/log/nginx /build
USER 101

EXPOSE 8080
