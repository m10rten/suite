package echo

import (
	"log"

	"golang.org/x/net/context"
)

type Server struct{}

func (s *Server) Echo(ctx context.Context, in *Message) (*Message, error) {
	log.Printf("Received: %v", in.Body)
	return &Message{Body: "Hello from the server!"}, nil
}

// Add this method to satisfy the EchoServiceServer interface
func (s *Server) mustEmbedUnimplementedEchoServiceServer() {}
