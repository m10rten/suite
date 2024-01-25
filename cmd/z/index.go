package main

import (
	"fmt"

	Z "github.com/m10rten/suite/pkg/z"
)

func main() {
	// Example usage
	z := Z.Z{}

	schema := z.Object(map[string]Z.Validator{
		"name": z.String(),
		"age":  z.Number(),
	})

	unknownData := map[string]interface{}{
		"name": "John",
		"age":  25,
	}
	data, success, err := schema.Parse(unknownData)
	if success {
		fmt.Printf("Validation successful: %+v\n", data)
		fmt.Printf("Name: %s\n", data["name"]) // not fully type safe, but better than nothing
	} else {
		fmt.Printf("Validation failed: %v\n", err)
	}

	str := z.String()

	// Validate string
	strData, success, err := str.Parse("Hello world")
	if success {
		fmt.Printf("Validation successful: %+v\n", strData)
	} else {
		fmt.Printf("Validation failed: %v\n", err)
	}

	// Validate number
	num := z.Number()
	numData, success, err := num.Parse(42)
	if success {
		fmt.Printf("Validation successful: %+v\n", numData)
	} else {
		fmt.Printf("Validation failed: %v\n", err)
	}
}
