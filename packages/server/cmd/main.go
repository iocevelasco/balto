package main

import (
	"log"
	"net/http"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
	"github.com/iocevelasco/patitas/internal/queries"
)

func main() {
	schemaConfig := graphql.SchemaConfig{Query: queries.UserQueryType}
	schema, err := graphql.NewSchema(schemaConfig)
	if err != nil {
		log.Fatal(err)
	}

	usersHandler := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
	})

	http.Handle("/users", usersHandler)
	http.ListenAndServe(":42069", nil)
}
