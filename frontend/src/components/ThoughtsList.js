import React from 'react'
import DeleteEntry from './DeleteEntry'
import pikabob from '../images/pikabob.png'
import { graphql } from 'react-apollo'
import moment from 'moment'
import {thoughtsListQuery} from '../querys'

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
            <DeleteEntry id={th.id}/>
            </div>
          </li>
        )
      })
     }
   </ul>;
}

const ThoughListWithData = graphql(thoughtsListQuery
)(thoughtsList)

export default ThoughListWithData