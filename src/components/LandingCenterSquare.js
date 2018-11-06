import React from 'react'
import styled from 'styled-components'

import LandingProfileImage from './LandingProfileImage'
import Button from './Button'

const LandingCenterSquare = ({
  className,
  didMount,
  profile,
  profileImage,
}) => (
  <div className={className}>
    <div className="inSquare">
      <div className={`topRightIcons${didMount ? ' isVisible' : ''}`}>
        <Button
          icon="FiTwitter"
          // link={`https://twitter.com/${profile.twitter}`}
          className="socialLink hidden"
          // style={{ opacity: 0 }}
        />
        <Button
          icon="FiGithub"
          // link={`https://github.com/${profile.github}`}
          className="socialLink hidden"
        />
      </div>
      <div className="centerIconsRow">
        <div className={`topLeftIcons${didMount ? ' isVisible' : ''}`}>
          <Button
            icon="FiTwitter"
            // link={`https://twitter.com/${profile.twitter}`}
            className="socialLink hidden"
          />
          <Button
            icon="FiGithub"
            // link={`https://github.com/${profile.github}`}
            className="socialLink hidden"
          />
        </div>
        <LandingProfileImage profileImage={profileImage} />
        <div className={`bottomRightIcons${didMount ? ' isVisible' : ''}`}>
          <Button
            icon="FiMail"
            link={`mailto:${profile.email}`}
            target="_self"
            className="socialLink"
          />
          <Button
            icon="FiGithub"
            link={`https://github.com/${profile.github}`}
            className="socialLink"
          />
        </div>
      </div>
      <div className={`bottomLeftIcons${didMount ? ' isVisible' : ''}`}>
        <Button
          icon="FiTwitter"
          link={`https://twitter.com/${profile.twitter}`}
          className="socialLink"
        />
        <Button
          icon="FiLinkedin"
          link={`https://www.linkedin.com/in/${profile.linkedin}`}
          className="socialLink"
        />
      </div>
    </div>
  </div>
)

export default styled(LandingCenterSquare)`
  height: 0;
  width: 100%;
  max-width: 50vh;
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
  & .socialLink {
    background-color: transparent;
    color: rgba(255, 255, 255, 0.8);
    box-shadow: none;
    transform: rotate(-45deg);
    & .iconButton {
      padding: 2px 0;
    }
    &:hover {
      background-color: transparent;
      color: orange;
      box-shadow: none;
    }
    @media screen and (min-width: 769px) {
      & .iconButton {
        padding: 5px 8px;
      }
    }
  }
  & .topLeftIcons,
  .topRightIcons,
  .bottomLeftIcons,
  .bottomRightIcons {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    transition: transform 0.3s ease-in-out;
  }
  & .topLeftIcons,
  .bottomRightIcons {
    flex-direction: column;
  }
  & .bottomLeftIcons {
    transform: translateY(-100%);
    transition-delay: 0.15s;
    &.isVisible {
      transform: translateY(0);
    }
  }
  & .bottomRightIcons {
    transform: translateX(-100%);
    transition-delay: 0s;
    &.isVisible {
      transform: translateX(0);
    }
  }
  & .topLeftIcons {
    transform: translateX(100%);
    transition-delay: 0.3s;
    &.isVisible {
      transform: translateX(0);
    }
  }
  & .topRightIcons {
    transform: translateY(100%);
    transition-delay: 0.45s;
    &.isVisible {
      transform: translateY(0);
    }
  }
  & .topLeftIcons svg,
  .topRightIcons svg,
  .bottomLeftIcons svg,
  .bottomRightIcons svg {
    min-width: 30px;
    min-height: 30px;
    width: 5vh;
    height: 5vh;
    max-width: 50px;
    max-height: 50px;
    padding: 5px;
    @media screen and (min-width: 768px) {
      min-width: 40px;
      min-height: 40px;
    }
  }
  & .centerIconsRow {
    display: flex;
    align-items: center;
    width: 100%;
  }
`
