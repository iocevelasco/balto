package queries

import (
	"github.com/graphql-go/graphql"
	"github.com/iocevelasco/patitas/internal/types"
)

var petType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Pet",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
			Resolve: func(p graphql.ResolveParams) (any, error) {
				pet, ok := p.Source.(types.Pet)
				if !ok {
					return nil, nil
				}
				return pet.ID, nil
			},
		},
		"name": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
			Resolve: func(p graphql.ResolveParams) (any, error) {
				pet, ok := p.Source.(types.Pet)
				if !ok {
					return nil, nil
				}
				return pet.Name, nil
			},
		},
	},
})
