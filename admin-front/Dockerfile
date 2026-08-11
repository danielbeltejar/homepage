FROM cgr.dev/chainguard/node:latest-dev@sha256:faaa01a763769b26884086836cce0f8bbdea7eb0f193a5422cb25274e4142803 AS builder

WORKDIR /app

COPY --chown=node:node package.json package-lock.json* ./
RUN npm install

COPY --chown=node:node . .
RUN npm run build

FROM cgr.dev/chainguard/nginx:latest@sha256:2189489ef3fa5b1e94a8463f98f9c148a4d8e7498d3f747069fc78de405742fc

COPY --from=builder /app/build/ /build/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
