# GRPC Example

## Go

### Pre-requisites

To run or setup your own GRPC server, you will need to have the following installed:

- [Go](https://golang.org/dl/)
- [Protocol Buffers](https://developers.google.com/protocol-buffers/docs/downloads)
- [GRPC](https://grpc.io/docs/languages/go/quickstart/)

### Installation

You can install the `protoc` compiler by following the instructions [here](https://grpc.io/docs/languages/go/quickstart/).

### Running the server

To run the server, navigate to the `services/grpc` directory and run the following command:

```bash
go run server.go
```

### Running the client

To run the client, navigate to the `services/grpc/client` directory and run the following command:

```bash
go run client.go
```

## Node

### Pre-requisites

To run or setup your own GRPC server, you will need to have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [Protocol Buffers](https://developers.google.com/protocol-buffers/docs/downloads)
- [GRPC](https://grpc.io/docs/languages/node/quickstart/)

### Installation

You can install the `protoc` compiler by following the instructions [here](https://grpc.io/docs/languages/node/quickstart/).

### Running the server

To run the server, navigate to the `services/grpc` directory and run the following command:

```bash
node server.js
```
