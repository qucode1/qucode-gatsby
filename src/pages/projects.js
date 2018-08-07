import React, { Component } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import Button from '../components/Button'
import Modal from '../components/ProjectsImageModal'

class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      galleryOpen: false,
      galleryImage: null,
    }
  }
  openImageGallery = image => {
    console.log('image', image)
    this.setState({ galleryOpen: true, galleryImage: image })
  }
  render() {
    const projects = this.props.data.allContentfulProject.edges
    return (
      <Layout landing>
        <div className={this.props.className}>
          <h2>Projects</h2>
          {projects.map(
            ({
              node: {
                id,
                title,
                description,
                tags,
                demo,
                code,
                serverCode,
                images,
              },
            }) => (
              <div className="project" key={id}>
                <h4>{title}</h4>
                <p>{description.description}</p>
                {images &&
                  images.length && (
                    <div className="images">
                      {images.map(image => (
                        <div
                          key={image.id}
                          className="thumbnail"
                          onClick={() => this.openImageGallery(image)}
                        >
                          <Img
                            fluid
                            sizes={image.sizes}
                            alt={image.title}
                            className="projectImageInnerWrapper"
                            outerWrapperClassName="projectImageOuterWrapper"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                <div className="links">
                  <Button
                    className="link"
                    icon="FiLink"
                    link={demo}
                    text="Demo"
                  />
                  <Button
                    className="link"
                    icon="FiLink"
                    link={code}
                    text="Code"
                  />
                  <Button
                    className="link"
                    icon="FiLink"
                    link={serverCode}
                    text="Server Code"
                  />
                </div>
                <div className="tags">
                  {/* <h5>Tags:</h5> */}
                  {tags.map((tag, index) => (
                    <div className="tag" key={`tag-${index}`}>
                      <p>{tag}</p>
                    </div>
                  ))}
                </div>
                {this.state.galleryOpen &&
                  this.state.galleryImage && (
                    <Modal image={this.state.galleryImage} />
                  )}
              </div>
            )
          )}
        </div>
      </Layout>
    )
  }
}

const StyledProjects = styled(Projects)`
  padding: 5px;
  max-width: 100%;
  color: rgba(255, 255, 255, 0.9);
  display: grid;
  grid-template-rows: 64px 3fr 3fr 3fr;
  grid-gap: 10px;
  min-height: 100%;
  padding-bottom: 60px;
  grid-template-columns: minmax(calc(100% - 10px), 400px);
  grid-template-areas:
    'title'
    'project';
  justify-content: center;
  @media screen and (min-width: 650px) {
    grid-template-columns: repeat(2, minmax(calc(100% / 2 - 20px), 400px));
    grid-template-areas:
      'title title'
      'project project';
  }
  @media screen and (min-width: 850px) {
    grid-template-areas:
      'title title title'
      'project project project'
      'project project project'
      'project project project';
    grid-template-columns: repeat(3, minmax(calc(100% / 3 - 30px), 400px));
  }
  h2 {
    margin: 15px 0;
    grid-area: title;
  }
  & .project {
    background-color: rgba(7, 27, 37, 0.45);
    border-radius: 5px;
    padding: 10px;
    & h4 {
      margin-bottom: 10px;
    }
    & > p {
      margin: 5px 0;
    }
  }
  & .images {
    display: flex;
    margin: 10px 0;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-around;
  }
  & .projectImageOuterWrapper {
    width: 70px;
  }
  & .tags {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  & .tag {
    padding: 5px;
    margin: 5px;
    color: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
    font-size: 14px;
    background-color: #5a005a;
  }
  & .links {
    display: flex;
    flex-wrap: wrap;
    margin: 15px 0;
  }
  & .link {
    margin: 5px;
  }
`

export default props => (
  <StaticQuery
    query={graphql`
      query projectsQuery {
        allContentfulProject {
          edges {
            node {
              id
              title
              description {
                id
                description
              }
              tags
              demo
              code
              serverCode
              images {
                id
                title
                sizes(resizingBehavior: PAD, quality: 100) {
                  ...GatsbyContentfulSizes_withWebp
                }
              }
            }
          }
        }
      }
    `}
    render={data => <StyledProjects data={data} {...props} />}
  />
)