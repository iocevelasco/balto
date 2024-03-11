package main

import (
	"log"
	"os"

	"github.com/iocevelasco/patitas/api"
	"github.com/iocevelasco/patitas/internal/database"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	mysqlSource := os.Getenv("MYSQL_SOURCE")
	if mysqlSource == "" {
		mysqlSource = "root:password@tcp(localhost:3306)/patitas"
	}
	db, err := database.NewMySql(mysqlSource)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	server := api.NewServer(port, db)
	log.Fatal(server.Run())
}
