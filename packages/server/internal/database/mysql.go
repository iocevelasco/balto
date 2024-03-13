package database

import (
	"context"
	"database/sql"
	"log"

	"github.com/iocevelasco/patitas/internal/types"
)

type MySql struct {
	db *sql.DB
}

func NewMySql(dataSourceName string) (*MySql, error) {
	db, err := sql.Open("mysql", dataSourceName)
	if err != nil {
		log.Printf("error opening database: %v", err)
		return nil, err
	}

	return &MySql{db: db}, nil
}

func (m *MySql) Close() error {
	return m.db.Close()
}

func (m *MySql) GetTodos(ctx context.Context) ([]*types.Todo, error) {
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

func (m *MySql) CreateTodo(ctx context.Context, todo *types.Todo) (int64, error) {
	stmt, err := m.db.Prepare("INSERT INTO todos (text, done) VALUES (?, ?)")
	if err != nil {
		log.Printf("error preparing statement: %v", err)
		return 0, err
	}
	defer stmt.Close()

	res, err := stmt.ExecContext(ctx, todo.Text, todo.Done)
	if err != nil {
		log.Printf("error inserting todo: %v", err)
		return 0, err
	}

	return res.LastInsertId()
}
