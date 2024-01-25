FROM golang:1.21-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache git

WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

RUN go mod download

# Copy source files
COPY ./api ./api
COPY ./cmd ./cmd
COPY ./cmd/api/index.go ./main.go
COPY ./pkg ./pkg

# Build the application
RUN go build -o main .

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the executable
CMD ["./main"]
