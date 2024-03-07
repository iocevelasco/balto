package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/iocevelasco/patitas/internal/types"
)

var UserQueryType = graphql.NewObject(graphql.ObjectConfig{
	Name: "User Query",
	Fields: graphql.Fields{
		"user": &graphql.Field{
			Type:        userType,
			Description: "Get a user by ID, name or age",
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
				"name": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
				"age": &graphql.ArgumentConfig{
					Type: graphql.Int,
				},
			},
			Resolve: func(p graphql.ResolveParams) (any, error) {
				return types.User{
					ID:   "1234",
					Name: "Ioce Velasco",
					Age:  99,
					Pets: []types.Pet{
						{
							ID:   "1234",
							Name: "Coco",
						},
					},
				}, nil
			},
		},
	},
})
