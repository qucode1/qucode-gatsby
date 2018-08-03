import React, { Component } from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import LandingBackground from '../components/LandingBackground'
import LandingCenterSquare from '../components/LandingCenterSquare'

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      didMount: false,
    }
  }
  componentDidMount() {
    this.setState({ didMount: true })
  }
  render() {
    const { data, className } = this.props
    const profile = data.allContentfulPerson.edges[0].node
    const bg = data.background.edges[0].node
    const profileImage = data.profile.edges[0].node
    return (
      <Layout landing>
        <div className={className}>
          <LandingBackground bg={bg} />
          <div className="greeting">
            <h1>Hi people</h1>
            <p>My name is {profile.name}</p>
          </div>
          <div className="content">
            <LandingCenterSquare
              profileImage={profileImage}
              didMount={this.state.didMount}
            />
          </div>
          <Link className="nextPageLink" to="/page-2/">
            Go to page 2
          </Link>
        </div>
      </Layout>
    )
  }
}

const StyledIndexPage = styled(IndexPage)`
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 1fr;
  grid-template-rows: 1fr 4fr 4fr 1fr;
  grid-template-areas:
    'header header header header'
    '. main main .'
    '. main main .'
    'footer footer footer footer';
  grid-gap: 5px;
  height: 100%;

  & .greeting {
    grid-area: header;
  }
  & .content {
    grid-column: 2 / 4;
    grid-row: 2 / 4;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
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
        background: allContentfulAsset(filter: { title: { eq: "bg" } }) {
          edges {
            node {
              id
              title
              sizes(quality: 100) {
                ...GatsbyContentfulSizes_withWebp
              }
            }
          }
        }
        profile: allContentfulAsset(filter: { title: { eq: "profile" } }) {
          edges {
            node {
              id
              title
              sizes(quality: 100) {
                ...GatsbyContentfulSizes_withWebp
              }
            }
          }
        }
      }
    `}
    render={data => <StyledIndexPage data={data} {...props} />}
  />
)
