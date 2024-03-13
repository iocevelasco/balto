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

	dbSource := os.Getenv("DATABASE_URL")
	if dbSource == "" {
		log.Fatal("DATABASE_URL not found")
	}

	db, err := database.NewPostgres(dbSource)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	server := api.NewServer(port, db)
	log.Fatal(server.Run())
}
