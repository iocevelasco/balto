package database

import (
	"context"
	"database/sql"
	"log"

	"github.com/iocevelasco/patitas/internal/types"
	_ "github.com/jackc/pgx/v4/stdlib"
)

type Postgres struct {
	db *sql.DB
}

func NewPostgres(dataSourceName string) (*Postgres, error) {
	db, err := sql.Open("pgx", dataSourceName)
	if err != nil {
		log.Printf("error opening database: %v", err)
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return &Postgres{db: db}, nil
}

func (m *Postgres) Close() error {
	return m.db.Close()
}

func (m *Postgres) GetTodos(ctx context.Context) ([]*types.Todo, error) {
	var todos []*types.Todo
	rows, err := m.db.QueryContext(ctx, "SELECT * FROM todos")
	if err != nil {
		log.Printf("error querying database: %v", err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var todo types.Todo
		err := rows.Scan(&todo.ID, &todo.Text, &todo.Done)
		if err != nil {
			log.Printf("error scanning row: %v", err)
			return nil, err
		}
		todos = append(todos, &todo)
	}

	return todos, nil
}

func (m *Postgres) CreateTodo(ctx context.Context, todo *types.Todo) (int64, error) {
	stmt, err := m.db.Prepare("INSERT INTO todos (text, done) VALUES ($1, $2) RETURNING id")
	if err != nil {
		log.Printf("error preparing statement: %v", err)
		return 0, err
	}
	defer stmt.Close()

	var id int
	err = stmt.QueryRowContext(ctx, todo.Text, todo.Done).Scan(&id)
	if err != nil {
		return 0, err
	}

	return int64(id), nil
}
