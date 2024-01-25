package main

import (
	"fmt"
	"net/http"

	H "github.com/m10rten/suite/apps/api/api"
)

func main() {
		fmt.Println("Starting server on port 8080...")
		// import the Handler function from the api package
		http.HandleFunc("/", H.Handler)

		http.ListenAndServe(":8080", nil)
}
