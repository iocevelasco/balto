package types

type Todo struct {
	ID     int64
	Text   string
	Done   bool
	UserID string
	User   *User
}
