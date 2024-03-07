package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/iocevelasco/patitas/internal/types"
)

var userType = graphql.NewObject(graphql.ObjectConfig{
	Name: "User",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
			Resolve: func(p graphql.ResolveParams) (any, error) {
				user, ok := p.Source.(types.User)
				if !ok {
					return nil, nil
				}
				return user.ID, nil
			},
		},
		"name": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
			Resolve: func(p graphql.ResolveParams) (any, error) {
				user, ok := p.Source.(types.User)
				if !ok {
					return nil, nil
				}
				return user.Name, nil
			},
		},
		"age": &graphql.Field{
			Type: graphql.NewNonNull(graphql.Int),
			Resolve: func(p graphql.ResolveParams) (any, error) {
				user, ok := p.Source.(types.User)
				if !ok {
					return nil, nil
				}
				return user.Age, nil
			},
		},
		"pets": &graphql.Field{
			Type: graphql.NewList(petType),
			Resolve: func(p graphql.ResolveParams) (any, error) {
				user, ok := p.Source.(types.User)
				if !ok {
					return nil, nil
				}
				return user.Pets, nil
			},
		},
	},
})
