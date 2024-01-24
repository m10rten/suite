package util

import "strconv"

func Square(num int) int {
	return num * num
}

func ToInt(num string) (int, error) {
	return strconv.Atoi(num)
}