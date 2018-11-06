import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled, { createGlobalStyle } from 'styled-components'
import 'normalize.css'
import { StaticQuery, graphql } from 'gatsby'

import Header from './Header'
import LandingBackground from './LandingBackground'

const Layout = ({ children, data, landing, className }) => {
  try {
    window.addEventListener('scroll', () => {
      window.document.body.scrollTop > 20 ||
      window.document.documentElement.scrollTop > 20
        ? window.document.querySelector('header').classList.add('darkBg')
        : window.document.querySelector('header').classList.remove('darkBg')
    })
  } catch (e) {
    console.log('[Error][Layout Scroll Event Listener]', e)
  }
  const bg = data.background.edges[0].node
  return (
    <div className={className}>
      <Helmet
        title="Gatsby Qucode"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      {landing && <LandingBackground bg={bg} />}
      <Header siteTitle="QuCode" />
      <main>{children}</main>
    </div>
  )
}

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  & main {
    background-color: ${({ landing }) =>
      landing ? 'transparent' : 'whitesmoke'};
    margin: 0;
    padding: ${({ landing }) => (landing ? '0' : '5px')};
    font-family: sans-serif;
    min-height: 100%;
    padding-top: 55px;
    overflow: ${({ modal }) => (modal ? 'hidden' : 'initial')};
    @media screen and (max-width: 768px) {
      padding-bottom: 55px;
    }
  }
  & a {
    text-decoration: none;
  }
`

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: sans-serif;
    margin: 0;
    padding: 0;
  }
  html, body {
    width: 100%;
    height: 100%
  }
`

// injectGlobal`
//   * {
//     box-sizing: border-box;
//     font-family: sans-serif;
//     margin: 0;
//     padding: 0;
//   }
//   html, body {
//     width: 100%;
//     height: 100%
//   }
  
// `

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  landing: PropTypes.bool,
}

export default props => (
  <React.Fragment>
  <StaticQuery
    query={graphql`
      query {
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
      }
    `}
    render={data => <StyledLayout data={data} {...props} />}
  />
  <GlobalStyle/>
  </React.Fragment>
)
