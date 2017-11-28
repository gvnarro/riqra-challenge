import React, { Component } from 'react'
import logo from './logo.svg'
import pikabob from './pikabob.png'
import './App.css'
import moment from 'moment'

import { ApolloProvider, graphql } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link: new HttpLink({ uri: 'http://localhost:8082/' }),
  cache: new InMemoryCache()
})

const thoughtsListQuery = gql`
query { 
  thoughts { 
    id 
    name
    createdAt
    thought
  }
}`;

const submitThought = gql`
  mutation thoughtCreate($name: String!, $thought: String!) {
    thoughtCreate(name: $name, thought: $thought) {
      name
      thought
    }
  }
`;

const deleteThought = gql`
  mutation thoughtRemove($id: Int!) {
    thoughtRemove(id: $id) {
      name
      thought
    }
  }
`;

const thoughtsList = ({ data: {loading, error, thoughts }}) => {
   if (loading) {
     return <p>Loading ...</p>;
   }
   if (error) {
     return <p>{error.message}</p>;
   }
   return <ul id="comments">
     { 
      thoughts.map( th => {
        return  (
          <li className="cmmnt" key={th.id}>
            <div className="avatar">
              <a>
                <img src={pikabob} width="55" height="55" alt="pikabob avatar"/>
              </a>
            </div>
            <div className="cmmnt-content">
              <header>
                <a 
                  className="userlink">
                  {th.name}
                </a> - <span className="pubdate">{moment(th.createdAt).fromNow()}</span>
              </header>
            <p>{th.thought}</p>
            <DeleteEntryWithData id={th.id}/>
            </div>
          </li>
        )
      })
     }
   </ul>;
}

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
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  render() {
    return <button className="bt-save" onClick={this.onClick.bind(this)}>Enviar Comentario</button>;
  }
}

const ThoughListWithData = graphql(thoughtsListQuery
)(thoughtsList);

const NewEntryWithData = graphql(submitThought)(NewEntry);

const DeleteEntryWithData = graphql(deleteThought)(DeleteEntry);

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      thought: '',
      update: false
    }

    this.onChange = this.onChange.bind(this)

  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="w" className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Riqra Challenge 2017</h1>
          </header>
          <div id="container" className="App-body">
            <ThoughListWithData />
            <form>
              <textarea 
                placeholder="Escribe un comentario"
                rows="20"
                name="thought"
                cols="40"
                required="required"
                value={ this.state.thought }
                onChange={ this.onChange }/>
              <br /><br />
              <NewEntryWithData name="Jean Alessi Reynoso" thought={this.state.thought}/>
            </form>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
