import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

const LandingProfileImage = ({ className, profileImage }) => (
  <div className={className}>
    <Img
      fluid
      sizes={profileImage.sizes}
      alt={profileImage.title}
      className="profileImageInnerWrapper"
      outerWrapperClassName="profileImageOuterWrapper"
      imgStyle={{
        left: '-2px',
        borderRadius: '50%',
      }}
    />
  </div>
)

export default styled(LandingProfileImage)`
  width: 100%;
  height: 100%;
  & .profileImageInnerWrapper {
    height: 100%;
    border-radius: 50%;
  }
  & .profileImageOuterWrapper {
    width: 100%;
    transform: rotate(-45deg);
    border-radius: 50%;
    z-index: 1;
  }
`
