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
		Text: input.Text,
		Done: false,
	}

	id, err := r.todosService.Create(ctx, todo)
	if err != nil {
		log.Printf("error creating todo: %v", err)
		return nil, err
	}

	return &model.Todo{
		ID:   id,
		Text: todo.Text,
		Done: todo.Done,
	}, nil
}

func (r *Resolver) GetTodos(ctx context.Context) ([]*model.Todo, error) {
	todos, err := r.todosService.GetTodos(ctx)
	if err != nil {
		log.Printf("error getting todos: %v", err)
		return nil, err
	}

	var response []*model.Todo
	for _, todo := range todos {
		response = append(response, &model.Todo{
			ID:   todo.ID,
			Text: todo.Text,
			Done: todo.Done,
		})
	}
	return response, nil
}
