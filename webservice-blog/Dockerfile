# Build environment
# -----------------
FROM cgr.dev/chainguard/go:latest-dev as builder
WORKDIR /app

#RUN apk add --no-cache gcc musl-dev

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o app ./cmd


# Deployment environment
# ----------------------
#FROM alpine as runtime
#WORKDIR /app

#COPY --from=builder /app/app .

EXPOSE 8080

CMD ["./app"]
