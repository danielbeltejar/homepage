# Build environment
# -----------------
FROM golang:1.21-alpine as builder
WORKDIR /app

RUN apk add --no-cache gcc musl-dev

COPY src/ ./

RUN go mod download
RUN go build -o app ./cmd


# Deployment environment
# ----------------------
FROM alpine as runtime
WORKDIR /app

COPY --from=builder /app/app .

EXPOSE 8080

CMD ["./app"]
