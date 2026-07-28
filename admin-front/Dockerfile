FROM cgr.dev/chainguard/node:latest-dev AS builder

WORKDIR /app

COPY --chown=node:node package.json package-lock.json* ./
RUN npm install

COPY --chown=node:node . .
RUN npm run build

FROM cgr.dev/chainguard/nginx:latest

COPY --from=builder /app/build/ /build/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
