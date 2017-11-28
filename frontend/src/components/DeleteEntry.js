import React, { Component } from 'react'
import {thoughtsListQuery} from '../querys'
import {deleteThought} from '../mutations'
import { graphql } from 'react-apollo'

class DeleteEntry extends Component {
  onClick(e) {
    e.preventDefault()

    this.props.mutate({
      variables: {
       id: this.props.id,
      },
      refetchQueries: [{
        query: thoughtsListQuery
      }],
    })
      .then(({ data }) => {
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  render() {
    return <button className="bt-delete" onClick={this.onClick.bind(this)}>Eliminar</button>
  }
}


const DeleteEntryWithData = graphql(deleteThought)(DeleteEntry);

export default DeleteEntryWithData