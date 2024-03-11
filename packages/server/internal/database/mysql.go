package database

import (
	"context"
	"database/sql"
	"log"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/mysql"
	_ "github.com/golang-migrate/migrate/v4/source/file"
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

	err = runMigrations(db)
	if err != nil {
		return nil, err
	}

	return &MySql{db: db}, nil
}

func runMigrations(db *sql.DB) error {
	driver, err := mysql.WithInstance(db, &mysql.Config{})
	if err != nil {
		log.Printf("error creating driver: %v", err)
		return err
	}

	m, err := migrate.NewWithDatabaseInstance("file://internal/database/migrations", "mysql", driver)
	if err != nil {
		log.Printf("error creating migration: %v", err)
		return err
	}

	err = m.Up()
	if err != nil && err != migrate.ErrNoChange {
		log.Printf("error running migration: %v", err)
		return err
	}

	return nil
}

func (m *MySql) Close() error {
	return m.db.Close()
}

func (m *MySql) Todos(ctx context.Context) ([]*types.Todo, error) {
	var todos []*types.Todo
	rows, err := m.db.QueryContext(ctx, "SELECT * FROM todos")
	if err != nil {
		log.Printf("error querying database: %v", err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var todo types.Todo
		err := rows.Scan(&todo.ID, &todo.Text, &todo.Done, &todo.UserID)
		if err != nil {
			log.Printf("error scanning row: %v", err)
			return nil, err
		}
		todos = append(todos, &todo)
	}

	return todos, nil
}

func (m *MySql) CreateTodo(ctx context.Context, todo *types.Todo) (int64, error) {
	stmt, err := m.db.Prepare("INSERT INTO todos (text, done, user_id) VALUES (?, ?, ?)")
	if err != nil {
		log.Printf("error preparing statement: %v", err)
		return 0, err
	}
	defer stmt.Close()

	res, err := stmt.ExecContext(ctx, todo.Text, todo.Done, todo.UserID)
	if err != nil {
		log.Printf("error inserting todo: %v", err)
		return 0, err
	}

	return res.LastInsertId()
}
