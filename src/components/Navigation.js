import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Navigation = ({ className }) => {
  return (
    <nav className={className}>
      <ul>
        <Link className="link" exact activeClassName="activeLink" to="/">
          Home
        </Link>
        <Link className="link" activeClassName="activeLink" to="/about">
          About
        </Link>
        <Link className="link" activeClassName="activeLink" to="/projects">
          Projects
        </Link>
        <Link className="link" activeClassName="activeLink" to="/contact">
          Contact
        </Link>
      </ul>
    </nav>
  )
}
export default styled(Navigation)`
  text-align: center;
  flex: 2;
  width: 100%;
  height: 100%;
  max-height: 55px;
  @media screen and (max-width: 768px) {
    position: fixed;
    bottom: 0;
    background-color: rgba(7, 27, 37, 0.84);
  }
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
  }
  & .link {
    color: rgba(255, 255, 255, 0.7);
    text-transform: capitalize;
    text-decoration: none;
    padding: 0 5px 0 5px;
    font-size: 20px;
    transition: 0.33s ease-out
    &:hover:not(.activeLink) {
      color: white;
    }
  }
  & .activeLink {
    color: orange;
    cursor: default;
  }
`
