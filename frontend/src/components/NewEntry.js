import React, { Component } from 'react'
import {thoughtsListQuery} from '../querys'
import {submitThought} from '../mutations'
import { graphql } from 'react-apollo'

class NewEntry extends Component {
  onClick(e) {
    e.preventDefault()

    this.props.mutate({
      variables: {
       name: this.props.name,
       thought: this.props.thought
      },
      refetchQueries: [{
        query: thoughtsListQuery
      }],
    })
      .then(({ data }) => {
        console.log('got data', data);
        this.props.clear() 
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  render() {
    return <button className="bt-save" onClick={this.onClick.bind(this)}>Enviar Comentario</button>;
  }
}

const NewEntryWithData = graphql(submitThought)(NewEntry)

export default NewEntryWithData