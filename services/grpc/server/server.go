package main

import (
	"log"
	"net"

	// "golang.org/x/net/context"
	"github.com/m10rten/suite/services/grpc/echo"
	"google.golang.org/grpc"
)

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := echo.Server{}

	grpcServer := grpc.NewServer()

	echo.RegisterEchoServiceServer(grpcServer, &s)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %s", err)
	}

}