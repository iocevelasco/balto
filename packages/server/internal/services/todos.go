package services

import (
	"context"

	"github.com/iocevelasco/patitas/internal/database"
	"github.com/iocevelasco/patitas/internal/types"
)

type TodosService struct {
	db database.Database
}

func NewTodosService(db database.Database) *TodosService {
	return &TodosService{db: db}
}

func (s *TodosService) Create(ctx context.Context, todo *types.Todo) (int64, error) {
	return s.db.CreateTodo(ctx, todo)
}
