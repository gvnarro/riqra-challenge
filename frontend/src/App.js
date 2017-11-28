import React, { Component } from 'react'
import logo from './images/logo.svg'
import './styles/App.css'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ThoughList from './components/ThoughtsList'
import NewEntry from './components/NewEntry'

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link: new HttpLink({ uri: 'http://localhost:8082/' }),
  cache: new InMemoryCache()
})

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
            <ThoughList />
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
              <NewEntry name="Jean Alessi Reynoso" thought={this.state.thought}/>
            </form>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
