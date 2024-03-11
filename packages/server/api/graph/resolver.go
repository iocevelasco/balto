//go:generate go run github.com/99designs/gqlgen generate
package graph

import (
	"context"
	"log"

	"github.com/iocevelasco/patitas/api/graph/model"
	"github.com/iocevelasco/patitas/internal/services"
	"github.com/iocevelasco/patitas/internal/types"
)

type Resolver struct {
	todosService *services.TodosService
	todos        []*model.Todo
}

func NewResolver(service *services.TodosService) *Resolver {
	return &Resolver{todosService: service}
}

func (r *Resolver) Create(ctx context.Context, input *model.NewTodo) (*model.Todo, error) {
	todo := &types.Todo{
		Text:   input.Text,
		Done:   false,
		UserID: input.UserID,
	}

	id, err := r.todosService.Create(ctx, todo)
	if err != nil {
		log.Printf("error creating todo: %v", err)
		return nil, err
	}

	return &model.Todo{
		ID:     id,
		Text:   todo.Text,
		Done:   todo.Done,
		UserID: todo.UserID,
	}, nil
}
