import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Header = ({ siteTitle, className }) => (
  <div className={className}>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontFamily: 'sans-serif',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
)

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  background-color: orange;
  width: 100%;
`

export default StyledHeader
