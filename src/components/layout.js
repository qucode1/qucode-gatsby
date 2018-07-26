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
    background-image: ${({ landing }) =>
      landing
        ? 'linear-gradient(to bottom right, rgba(31, 164, 237, 0.78), rgba(7, 27, 37, 0.84));'
        : 'none'}
    margin: 0;
    padding: ${({ landing }) => (landing ? '0' : '5px')};
    font-family: sans-serif;
    height: 100%;
  }
`

injectGlobal`
  * {
    box-sizing: border-box
  }
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  landing: PropTypes.bool,
}

export default StyledLayout
