package handler

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	util "github.com/m10rten/suite/pkg"
)

var (
	app *gin.Engine
)

func registerRouter(r *gin.RouterGroup) {
	r.GET("/api/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "ok",
		})
	})

	// Route for square root calculation
	r.GET("/api/square/:num", func(c *gin.Context) {
		num := c.Param("num")
		n, err := util.ToInt(num)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"result": util.Square(n),
		})
		return
	})
}

// init gin app
func init() {
	app = gin.New()

	// Handling routing errors
	app.NoRoute(func(c *gin.Context) {
		sb := &strings.Builder{}
		sb.WriteString("routing err: no route, try this:\n")
		for _, v := range app.Routes() {
			sb.WriteString(fmt.Sprintf("%s %s\n", v.Method, v.Path))
		}
		c.String(http.StatusNotFound, sb.String())
	})

	r := app.Group("/")

	// register route
	registerRouter(r)
}

func Handler(w http.ResponseWriter, r *http.Request) {
	app.ServeHTTP(w, r)
}