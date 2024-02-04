package main

import (
	"log"

	"github.com/m10rten/suite/services/grpc/echo"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
)

func main() {
	var conn *grpc.ClientConn
	conn, err := grpc.Dial(":50051", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %s", err)
	}
	defer conn.Close()

	c := echo.NewEchoServiceClient(conn)

	res, err := c.Echo(context.Background(), &echo.Message{Body: "Hello from the client!"})
	if err != nil {
		log.Fatalf("Error when calling Echo: %s", err)
	}
	log.Printf("Response from server: %s", res.Body)
	
}