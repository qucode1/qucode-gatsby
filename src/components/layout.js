import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
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
      <Header siteTitle="Gatsby Qucode" />
      <main>{children}</main>
    </div>
  )
}

const StyledLayout = styled(Layout)`
  height: 100vh;
  & main {
    background-color: ${({ landing }) =>
      landing ? 'cornflowerblue' : 'whitesmoke'};
    margin: ${({ landing }) => (landing ? '0' : '10px')};
    padding: ${({ landing }) => (landing ? '0' : '5px')};
    font-family: sans-serif;
  }
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  landing: PropTypes.bool,
}

export default StyledLayout
