FROM mirror.gcr.io/library/node:22-slim AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

FROM mirror.gcr.io/library/nginx:stable-alpine

COPY --from=builder /app/build/ /build/
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
