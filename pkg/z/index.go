package z

import (
	"errors"
	"fmt"
	"log"
)

// Validator interface for different validation types
type Validator interface {
	Parse(interface{}) (interface{}, bool, error)
}

// StringValidator validates strings
type StringValidator struct{}

// NumberValidator validates numbers
type NumberValidator struct{}

// ObjectValidator validates objects with nested validators
type ObjectValidator struct {
	Schema map[string]Validator
}

// ParsedData holds the parsed data with field names
type ParsedData map[string]interface{}

// Z struct encapsulating validators
type Z struct{}

// String method for Z struct
func (z Z) String() StringValidator {
	return StringValidator{}
}

// Number method for Z struct
func (z Z) Number() NumberValidator {
	return NumberValidator{}
}

// Object method for Z struct
func (z Z) Object(schema map[string]Validator) ObjectValidator {
	return ObjectValidator{Schema: schema}
}

// Parse for StringValidator
func (sv StringValidator) Parse(input interface{}) (interface{}, bool, error) {
	value, ok := input.(string)
	return value, ok, nil
}

// Parse for NumberValidator
func (nv NumberValidator) Parse(input interface{}) (interface{}, bool, error) {
	switch value := input.(type) {
	case float64:
		return value, true, nil
	case int:
		return float64(value), true, nil
	default:
		return nil, false, errors.New("invalid input type for number validation")
	}
}

// Parse for ObjectValidator
func (ov ObjectValidator) Parse(input interface{}) (map[string]interface{}, bool, error) {
	data, ok := input.(map[string]interface{})
	log.Printf("Input: %+v", input)
	if !ok {
		return nil, false, errors.New("invalid input type for object validation")
	}

	result := make(ParsedData)
	for key, validator := range ov.Schema {
		fieldValue, fieldExists := data[key]
		parsedValue, success, err := validator.Parse(fieldValue)
		log.Printf("Parsed value for %s: %+v", key, parsedValue)
		if !fieldExists || !success {
			return nil, false, fmt.Errorf("validation failed for field %s: %v", key, err)
		}

		result[key] = parsedValue
	}

	return result, true, nil
}

// make Z available as a global variable
var ZValidator Z
