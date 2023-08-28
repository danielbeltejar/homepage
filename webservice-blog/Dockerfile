# Build environment
# -----------------
FROM golang:1.20-alpine as builder
WORKDIR /app

RUN apk add --no-cache gcc musl-dev

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -ldflags '-w -s' -a -o ./cmd/api


# Deployment environment
# ----------------------
FROM alpine
WORKDIR /app

COPY --from=builder /app/app .

EXPOSE 8080

CMD ["./app"]