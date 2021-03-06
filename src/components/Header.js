import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Navigation from './Navigation'

const Header = ({ siteTitle, className }) => (
  <header className={className}>
    <h1 className="title">
      <Link
        to="/"
        style={{
          color: 'rgba(255, 255, 255, .9)',
          textDecoration: 'none',
          fontFamily: 'sans-serif',
        }}
      >
        {siteTitle}
      </Link>
    </h1>
    <Navigation />
    <div className="placeholder" />
  </header>
)

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  background-color: transparent;
  width: 100%;
  height: 55px;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 1;
  box-shadow: 0 0 1px rgba(7, 27, 37, 0.84);
  transition: 0.25s ease-in;
  &.darkBg {
    background-color: rgba(7, 27, 37, 0.84);
  }
  & .title {
    margin: auto;
    flex: 1;
  }
  & .placeholder {
    margin: 0;
    flex: 1;
  }
`

export default StyledHeader
