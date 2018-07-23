import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = props => {
  return (
    <Layout>
      <h1>Hi people</h1>
      <p>My name is {props.data.allContentfulPerson.edges[0].node.name}</p>
      <img
        srcSet={
          props.data.allContentfulPerson.edges[0].node.image.resolutions
            .srcSetWebp
        }
        alt="John Doe"
      />
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

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
                resolutions(resizingBehavior: SCALE) {
                  srcSetWebp
                }
              }
            }
          }
        }
      }
    `}
    render={data => <IndexPage data={data} {...props} />}
  />
)
