import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled, { injectGlobal } from 'styled-components'
import 'normalize.css'
// import { StaticQuery, graphql } from 'gatsby'

import Header from './header'

const Layout = ({ children, data, landing, className }) => {
  return (
    <div className={className}>
      <Helmet
        title="Gatsby Qucode"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      {!landing && <Header siteTitle="Gatsby Qucode" />}
      <main>{children}</main>
    </div>
  )
}

const StyledLayout = styled(Layout)`
  height: 100vh;
  & main {
    background-color: ${({ landing }) =>
      landing ? 'transparent' : 'whitesmoke'};
    margin: 0;
    padding: ${({ landing }) => (landing ? '0' : '5px')};
    font-family: sans-serif;
    height: 100%;
  }
`

injectGlobal`
  * {
    box-sizing: border-box;
  }
  html, body {
    width: 100vW;
    height: 100vH
  }
  
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  landing: PropTypes.bool,
}

export default StyledLayout
