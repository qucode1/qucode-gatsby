import React, { Component } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'

class About extends Component {
  render() {
    const profile = this.props.data.allContentfulPerson.edges[0].node
    return (
      <Layout landing>
        <div className={this.props.className}>
          <h2>About Me</h2>
          <p>{profile.shortBio.shortBio}</p>
        </div>
      </Layout>
    )
  }
}

const StyledAbout = styled(About)`
  padding: 10px;
  margin: 15px auto;
  border-radius: 5px;
  background-color: rgba(7, 27, 37, 0.45);
  width: 95%;
  max-width: 1000px;
  color: rgba(255, 255, 255, 0.9);
  h2 {
    color: white;
    margin: 15px 0;
  }
`

export default props => (
  <StaticQuery
    query={graphql`
      query aboutQuery {
        allContentfulPerson {
          edges {
            node {
              id
              title
              name
              shortBio {
                shortBio
              }
            }
          }
        }
      }
    `}
    render={data => <StyledAbout data={data} {...props} />}
  />
)
