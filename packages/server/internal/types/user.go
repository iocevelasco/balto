package types

type User struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Age  int    `json:"age"`
	Pets []Pet  `json:"pets"`
}
