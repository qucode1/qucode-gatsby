import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Layout from '../components/layout'

const IndexPage = ({ data, className }) => {
  const profile = data.allContentfulPerson.edges[0].node
  return (
    <Layout landing>
      <div className={className}>
        <div className="greeting">
          <h1>Hi people</h1>
          <p>My name is {profile.name}</p>
        </div>
        <div className="imgContainer">
          <Img
            fluid
            sizes={profile.image.sizes}
            alt={profile.image.title}
            width="100%"
          />
        </div>
        <Link className="nextPageLink" to="/page-2/">
          Go to page 2
        </Link>
      </div>
    </Layout>
  )
}

const StyledIndexPage = styled(IndexPage)`
  display: grid;
  grid-template-columns: auto 25% 25% auto;
  grid-template-rows: auto 25% 25% auto;
  grid-gap: 5px;
  & .greeting {
    grid-column: 2 / 4;
    grid-row: 1 / 2;
  }
  & .imgContainer {
    grid-column: 2 / 4;
    grid-row: 2 / 4;
  }
  & .nextPageLink {
    grid-column: 3 / 4;
    grid-row: 4 / 5;
    text-align: right;
  }
`

export default props => (
  <StaticQuery
    query={graphql`
      query allContentfulPerson {
        allContentfulPerson {
          edges {
            node {
              id
              title
              name
              email
              image {
                id
                title
                sizes(quality: 100) {
                  ...GatsbyContentfulSizes_withWebp
                }
              }
            }
          }
        }
      }
    `}
    render={data => <StyledIndexPage data={data} {...props} />}
  />
)
