import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { FiGithub, FiTwitter } from 'react-icons/fi'

import Layout from '../components/layout'

const IndexPage = ({ data, className }) => {
  const profile = data.allContentfulPerson.edges[0].node
  const bg = data.background.edges[0].node
  const profileImage = data.profile.edges[0].node
  console.log(profileImage)
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
          <div className="profileImgContainer">
            <div className="topLeftIcons">
              <FiTwitter />
              <FiGithub />
            </div>
            <div className="centerIconsRow">
              <div className="bottomLeftIcons">
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
                }}
              />
              <div className="topRightIcons">
                <FiGithub />
                <FiTwitter />
              </div>
            </div>
            <div className="bottomRightIcons">
              <FiGithub />
              <FiTwitter />
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

const StyledIndexPage = styled(IndexPage)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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
    background-image: linear-gradient(to bottom right, rgba(31, 164, 237, 0.78), rgba(7, 27, 37, 0.84));
    position: fixed;
    width: 100vW;
    height: 100vH
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
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "image";
  }
  & .profileImgContainer {
    grid-area: image;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transform: rotate(45deg);
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
    max-height: 100%;
    max-width: 400px;
    width: 100%;
    transform: rotate(-45deg);
  }
  & .topLeftIcons,
  .topRightIcons,
  .bottomLeftIcons,
  .bottomRightIcons {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }
  & .topLeftIcons,
  .bottomRightIcons {
  }
  & .topRightIcons,
  .bottomLeftIcons {
    flex-direction: column;
  }
  & .topLeftIcons svg,
  .topRightIcons svg,
  .bottomLeftIcons svg,
  .bottomRightIcons svg {
    transform: rotate(-45deg);
    padding: 5px;
    min-width: 30px;
    min-height: 30px
    width: 5vH;
    height: 5vH;
    max-width: 50px;
    max-height: 50px
  }
  & .centerIconsRow {
    display: flex;
    align-items: center;
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
