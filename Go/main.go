package main

import (
	"github.com/gin-gonic/gin"
	"github.com/itsjamie/gin-cors"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"log"
	"net/http"
)

func main() {
	// Initialize a new Gin router
	router := gin.Default()

	// Apply the middleware to the router (works with groups too)
	router.Use(cors.Middleware(cors.Config{
		Origins:         "*",
		Methods:         "GET, PUT, POST, DELETE",
		RequestHeaders:  "Origin, Authorization, Content-Type",
		ExposedHeaders:  "",
		MaxAge:          5000,
		Credentials:     true,
		ValidateHeaders: false,
	}))

	v1 := router.Group("/math")
	{
		v1.GET("/equations", fetchAllEquations)
		v1.POST("/add", createAEquation)
	}

	router.Run(":8080")
}

var db *gorm.DB

func init() {
	//open a DB connection
	var err error
	db, err = gorm.Open("mysql", "root:@tcp(localhost:3306)/sezzle_calc?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		log.Println("Error:", err)
		panic("failed to connect to database sezzle_calc")
	}

	db.AutoMigrate(&equationModel{})
}

type (
	//equationModel describes equationModel type
	equationModel struct {
		gorm.Model
		Input  string `json:"input"`
		Result string `json:"result"`
	}

	transformedEquation struct {
		ID     uint   `json:"id"`
		Input  string `json:"input"`
		Result string `json:"result"`
	}
)

//addNewEquation add a new equation
// func addNewEquation(c *gin.Context) {
// 	equation := equationModel{Input: c.PostForm("input"), Result: c.PostForm("result")}
// 	db.Save(&equation)
// 	c.JSON(http.StatusCreated, gin.H{"status": http.StatusCreated, "message": "Equation added successfully", "resourceId": equation.ID})
// }

func createEquations(equation *equationModel) (err error) {
	if err = db.Create(equation).Error; err != nil {
		return err
	}
	return nil
}

func createAEquation(c *gin.Context) {
	var equation equationModel
	c.BindJSON(&equation)
	err := createEquations(&equation)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, equation)
	}
}

//fetchAllEquations fetches all equations
func fetchAllEquations(c *gin.Context) {
	var equations []equationModel
	var _equations []transformedEquation
	//GET request
	// SELECT * FROM equations ORDER BY id desc LIMIT 10
	db.Order("id desc").Limit(10).Find(&equations)

	if len(equations) <= 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "No equations found!"})
		return
	}

	//transforms the equations for building a good response
	for _, item := range equations {
		_equations = append(_equations, transformedEquation{ID: item.ID, Input: item.Input, Result: item.Result})
	}
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": _equations})
}
