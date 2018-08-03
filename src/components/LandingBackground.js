import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

const LandingBackground = ({ bg, className }) => (
  <div className={className}>
    <div className="bgGradient" />
    <Img fluid sizes={bg.sizes} alt={bg.title} className="bgImage" />
  </div>
)

export default styled(LandingBackground)`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  position: fixed;
  z-index: -1;
  height: 100vh;
  width: 100vw;
  & .bgGradient {
    background-image: linear-gradient(
      to bottom right,
      rgba(31, 164, 237, 0.78),
      rgba(7, 27, 37, 0.84)
    );
    position: fixed;
    width: 100vw;
    height: 100vh;
  }
  & .bgImage {
    filter: grayscale(100%) brightness(50%);
    z-index: -1;
    height: 100vh;
    width: 100vw;
  }
`
