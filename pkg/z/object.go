package main

import (
	"fmt"
	"log"
)

type Z struct{}

type Schema struct{}

// Function `Object` on `z` instance of `Z` type
// is a method of `Z` type.
// takes in any object/struct and returns a schema with a `parse` method
func (z Z) Object(obj interface{}) *Schema {
	return &Schema{}
}

func (s *Schema) Parse(data interface{}) (interface{}, bool, error) {
	// parse data, error if data is not valid to schema
	// return parsed data, valid, error
log.Println("parse")
log.Println(data)
	// check if data is valid to schema
	valid := true
	if data == nil {
		valid = false
	}

	if !valid {
		return nil, false, fmt.Errorf("invalid data")
	}
	return data, valid, error(nil)
}


func main() {
	z := Z{}
	
	test := z.Object(struct {
		Name string `json:"name"`
		Age  int    `json:"age"`
	}{})
	
	 data, valid, err := test.Parse(struct {
		Name string `json:"name"`
	}{})
	if err != nil {
		log.Fatal(err)
	} else {

		log.Println(data, valid)
	}


}