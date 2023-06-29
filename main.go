package main

import (
  "log"
  "net/http"
  "github.com/gin-contrib/static"
  "github.com/gin-gonic/gin"
)


type Delay struct {
  MilliSec int `json:"ms" binding:"required"`
}
var d Delay

func main() {
  log.Println("Hur mycket segar SVT?")
  router := gin.Default()
  router.Use(static.Serve("/", static.LocalFile("./static", false)))
  

  api := router.Group("/api")
  {
    api.GET("/delay", func(c *gin.Context) {
      c.JSON(200, gin.H{
        "delay": d,
      })
    })
    api.POST("/delay", func(c *gin.Context) {
      if err:=c.BindJSON(&d);err!=nil{
         context.AbortWithError(http.StatusBadRequest,err)
         return
      }
      c.JSON(200, gin.H{"msyooo": d.MilliSec}) // Your custom response here
    })
  }


  router.Run(":40000")
}

