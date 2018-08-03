import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { FiGithub, FiTwitter } from 'react-icons/fi'

import LandingProfileImage from './LandingProfileImage'

const LandingCenterSquare = ({ className, didMount, profileImage }) => (
  <div className={className}>
    <div className="inSquare">
      <div className={`topRightIcons${didMount ? ' isVisible' : ''}`}>
        <FiTwitter />
        <FiGithub />
      </div>
      <div className="centerIconsRow">
        <div className={`topLeftIcons${didMount ? ' isVisible' : ''}`}>
          <FiTwitter />
          <FiGithub />
        </div>
        <LandingProfileImage profileImage={profileImage} />
        <div className={`bottomRightIcons${didMount ? ' isVisible' : ''}`}>
          <FiGithub />
          <FiTwitter />
        </div>
      </div>
      <div className={`bottomLeftIcons${didMount ? ' isVisible' : ''}`}>
        <FiGithub />
        <FiTwitter />
      </div>
    </div>
  </div>
)

export default styled(LandingCenterSquare)`
  height: 0;
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: rotate(45deg);
  & .inSquare {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    max-height: 400px;
    max-width: 400px;
    min-height: 200px;
    min-width: 200px;
    width: 100%;
    user-select: none;
  }
  & .topLeftIcons,
  .topRightIcons,
  .bottomLeftIcons,
  .bottomRightIcons {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    transition: transform 0.3s ease-in-out;
  }
  & .topLeftIcons,
  .bottomRightIcons {
    flex-direction: column;
  }
  & .bottomLeftIcons {
    transform: translateY(-100%);
    transition-delay: 0.3s;
    &.isVisible {
      transform: translateY(0);
    }
  }
  & .bottomRightIcons {
    transform: translateX(-100%);
    transition-delay: 0.15s;
    &.isVisible {
      transform: translateX(0);
    }
  }
  & .topLeftIcons {
    transform: translateX(100%);
    transition-delay: 0.45s;
    &.isVisible {
      transform: translateX(0);
    }
  }
  & .topRightIcons {
    transform: translateY(100%);
    &.isVisible {
      transform: translateY(0);
    }
  }
  & .topLeftIcons svg,
  .topRightIcons svg,
  .bottomLeftIcons svg,
  .bottomRightIcons svg {
    transform: rotate(-45deg);
    color: white;
    cursor: pointer;
    padding: 5px;
    min-width: 30px;
    min-height: 30px;
    width: 5vh;
    height: 5vh;
    max-width: 50px;
    max-height: 50px;
  }
  & .topLeftIcons svg:hover,
  .topRightIcons svg:hover,
  .bottomLeftIcons svg:hover,
  .bottomRightIcons svg:hover {
    color: orange;
  }
  & .centerIconsRow {
    display: flex;
    align-items: center;
    width: 100%;
  }
`
