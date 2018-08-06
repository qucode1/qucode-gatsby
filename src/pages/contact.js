import React, { Component } from 'react'
import Layout from '../components/Layout'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import Button from '../components/Button'

class Contact extends Component {
  render() {
    const profile = this.props.data.allContentfulPerson.edges[0].node
    return (
      <Layout landing>
        <div className={this.props.className}>
          <h2>Contact Me</h2>
          <p>Email: {profile.email}</p>
          {profile.twitter && (
            <Button
              icon="FiTwitter"
              link={`https://twitter.com/${profile.twitter}`}
              className="twitterBtn"
              size="30"
              text={profile.twitter}
            />
          )}
          {profile.github && (
            <Button
              icon="FiGithub"
              link={`https://github.com/${profile.github}`}
              className="githubBtn"
              size="30"
              text={profile.github}
            />
          )}
        </div>
      </Layout>
    )
  }
}

const StyledContact = styled(Contact)`
  padding: 10px;
  color: rgba(255, 255, 255, 0.9);
  & .h2 {
    margin: 15px 0;
  }
  & .twitterBtn,
  .githubBtn {
    display: inline-block;
    background-color: transparent;
    box-shadow: none;
    & a {
      color: rgba(255, 255, 255, 0.9);
    }
  }
`

export default props => (
  <StaticQuery
    query={graphql`
      query contactQuery {
        allContentfulPerson {
          edges {
            node {
              id
              name
              email
              twitter
              github
            }
          }
        }
      }
    `}
    render={data => <StyledContact data={data} {...props} />}
  />
)
