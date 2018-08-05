import React, { Component } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { FiLink } from 'react-icons/fi'

import Layout from '../components/Layout'
import Button from '../components/Button'

class Projects extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const projects = this.props.data.allContentfulProject.edges
    return (
      <Layout landing>
        <div className={this.props.className}>
          <h2>Projects</h2>
          {projects.map(
            ({
              node: { id, title, description, tags, demo, code, serverCode },
            }) => (
              <div key={id}>
                <h4>{title}</h4>
                <p>{description.description}</p>
                <div className="links">
                  <Button icon="FiLink" link={demo} text="Demo" />
                  <Button icon="FiLink" link={code} text="Code" />
                  <Button icon="FiLink" link={serverCode} text="Server Code" />
                </div>
                <div className="tags">
                  <h5>Tags:</h5>
                  {tags.map((tag, index) => (
                    <div className="tag" key={`tag-${index}`}>
                      <p>{tag}</p>
                    </div>
                  ))}
                </div>
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
  color: rgba(255, 255, 255, 0.9);
  & .tags {
    display: flex;
  }
  & .tag {
    padding: 5px;
    margin: 5px;
    color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 5px;
  }
  & .links {
    display: flex;
    & div {
      margin: 0 5px;
    }
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
            }
          }
        }
      }
    `}
    render={data => <StyledProjects data={data} {...props} />}
  />
)
