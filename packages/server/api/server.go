package api

import (
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/iocevelasco/patitas/api/graph"
	"github.com/iocevelasco/patitas/internal/database"
	"github.com/iocevelasco/patitas/internal/services"
)

type server struct {
	port string
	db   database.Database
}

func NewServer(port string, db database.Database) *server {
	return &server{port: port, db: db}
}

func (a *server) Run() error {
	a.registerHandlers()
	return http.ListenAndServe(":"+a.port, nil)
}

func (a *server) registerHandlers() {
	todosService := services.NewTodosService(a.db)

	config := graph.Config{Resolvers: graph.NewResolver(todosService)}
	schema := graph.NewExecutableSchema(config)
	srv := handler.NewDefaultServer(schema)

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)
}
