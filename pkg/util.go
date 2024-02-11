package util

import (
	"math"
	"strconv"
)

func Square(num int) int {
	return num * num
}

func Root(num int) float64 {
	return math.Sqrt(float64(num))
}

func ToInt(num string) (int, error) {
	return strconv.Atoi(num)
}