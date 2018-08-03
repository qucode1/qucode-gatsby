import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

const LandingProfileImage = ({ className, profileImage }) => (
  <Img
    fluid
    sizes={profileImage.sizes}
    alt={profileImage.title}
    className={className}
    outerWrapperClassName="profileImageOuterWrapper"
    imgStyle={{
      left: '-2px',
      borderRadius: '50%',
    }}
  />
)

export default styled(LandingProfileImage)`
  height: 100%;
  border-radius: 50%;
  & .profileImageOuterWrapper {
    width: 100%;
    transform: rotate(-45deg);
    border-radius: 50%;
    z-index: 1;
  }
`
