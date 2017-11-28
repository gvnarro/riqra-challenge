import gql from 'graphql-tag'

export const thoughtsListQuery = gql`
query { 
	thoughts { 
		id 
		name
		createdAt
		thought
	}
}`;
