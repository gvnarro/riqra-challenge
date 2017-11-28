import gql from 'graphql-tag'

export const submitThought = gql`
  mutation thoughtCreate($name: String!, $thought: String!) {
    thoughtCreate(name: $name, thought: $thought) {
      name
      thought
    }
  }
`;

export const deleteThought = gql`
  mutation thoughtRemove($id: Int!) {
    thoughtRemove(id: $id) {
      name
      thought
    }
  }
`;