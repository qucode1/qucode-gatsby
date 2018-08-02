import React, { Component } from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { FiGithub, FiTwitter } from 'react-icons/fi'

import Layout from '../components/layout'

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
          <div className="background">
            <div className="bgGradient" />
            <Img fluid sizes={bg.sizes} alt={bg.title} className="bgImage" />
          </div>
          <div className="greeting">
            <h1>Hi people</h1>
            <p>My name is {profile.name}</p>
          </div>
          <div className="content">
            <div className="squareContainer">
              <div className="inSquare">
                <div
                  className={`topRightIcons${
                    this.state.didMount ? ' isVisible' : ''
                  }`}
                >
                  <FiTwitter />
                  <FiGithub />
                </div>
                <div className="centerIconsRow">
                  <div
                    className={`topLeftIcons${
                      this.state.didMount ? ' isVisible' : ''
                    }`}
                  >
                    <FiTwitter />
                    <FiGithub />
                  </div>
                  <Img
                    fluid
                    sizes={profileImage.sizes}
                    alt={profileImage.title}
                    className="profileImageWrapper"
                    outerWrapperClassName="profileImageOuterWrapper"
                    imgStyle={{
                      left: '-2px',
                      borderRadius: '50%',
                    }}
                  />
                  <div
                    className={`bottomRightIcons${
                      this.state.didMount ? ' isVisible' : ''
                    }`}
                  >
                    <FiGithub />
                    <FiTwitter />
                  </div>
                </div>
                <div
                  className={`bottomLeftIcons${
                    this.state.didMount ? ' isVisible' : ''
                  }`}
                >
                  <FiGithub />
                  <FiTwitter />
                </div>
              </div>
            </div>
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
  & .background {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    position: fixed;
    z-index: -1;
    height: 100vh;
    width: 100vw;
  }
  & .bgGradient {
    background-image: linear-gradient(
      to bottom right,
      rgba(31, 164, 237, 0.78),
      rgba(7, 27, 37, 0.84)
    );
    position: fixed;
    width: 100vw;
    height: 100vh;
  }
  & .bgImage {
    filter: grayscale(100%) brightness(50%);
    z-index: -1;
    height: 100vh;
    width: 100vw;
  }
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
  & .squareContainer {
    height: 0;
    width: 100%;
    padding-bottom: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: rotate(45deg);
  }
  & .inSquare {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    max-height: 400px;
    max-width: 400px;
    min-height: 200px;
    min-width: 200px;
    width: 100%;
    user-select: none;
  }
  & .nextPageLink {
    grid-column: 3 / 4;
    grid-row: 4 / 5;
    text-align: right;
  }
  & .profileImageWrapper {
    height: 100%;
    border-radius: 50%;
  }
  & .profileImageOuterWrapper {
    width: 100%;
    transform: rotate(-45deg);
    border-radius: 50%;
    z-index: 1;
  }
  & .topLeftIcons,
  .topRightIcons,
  .bottomLeftIcons,
  .bottomRightIcons {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    transition: transform 0.3s ease-in-out;
  }
  & .topLeftIcons,
  .bottomRightIcons {
    flex-direction: column;
  }
  & .bottomLeftIcons {
    transform: translateY(-100%);
    transition-delay: 0.3s;
    &.isVisible {
      transform: translateY(0);
    }
  }
  & .bottomRightIcons {
    transform: translateX(-100%);
    transition-delay: 0.15s;
    &.isVisible {
      transform: translateX(0);
    }
  }
  & .topLeftIcons {
    transform: translateX(100%);
    transition-delay: 0.45s;
    &.isVisible {
      transform: translateX(0);
    }
  }
  & .topRightIcons {
    transform: translateY(100%);
    &.isVisible {
      transform: translateY(0);
    }
  }
  & .topLeftIcons svg,
  .topRightIcons svg,
  .bottomLeftIcons svg,
  .bottomRightIcons svg {
    transform: rotate(-45deg);
    color: white;
    cursor: pointer;
    padding: 5px;
    min-width: 30px;
    min-height: 30px;
    width: 5vh;
    height: 5vh;
    max-width: 50px;
    max-height: 50px;
  }
  & .topLeftIcons svg:hover,
  .topRightIcons svg:hover,
  .bottomLeftIcons svg:hover,
  .bottomRightIcons svg:hover {
    color: orange;
  }
  & .centerIconsRow {
    display: flex;
    align-items: center;
    width: 100%;
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
