package database

import (
	"context"

	"github.com/iocevelasco/patitas/internal/types"
)

type Database interface {
	Todos(context.Context) ([]*types.Todo, error)
	CreateTodo(context.Context, *types.Todo) (id int64, err error)
}
