import React, { Fragment } from 'react'
import styled from 'styled-components'
import Fi from 'react-icons/fi'

const Button = ({ icon, text, link, target = '_blank', ...props }) => {
  const Icon = Fi[icon]

  const button = icon ? (
    <div className="iconButton">
      <Icon />
      {text && <p>{text}</p>}
    </div>
  ) : (
    <div className="button">{text && <p>{text}</p>}</div>
  )

  return (
    <button {...props}>
      {link ? (
        <a href={link} target={target} rel="noopener noreferrer">
          {button}
        </a>
      ) : (
        <Fragment>{button}</Fragment>
      )}
    </button>
  )
}

export default styled(Button)`
  background-color: orange;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: -2px 3px 3px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  transition: 0.25s ease-in-out;
  &:hover:not(:disabled) {
    background-color: #ffba3d;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  }
  &:disabled {
    color: rgba(0, 0, 0, 0.78);
    background-color: #b57500;
    cursor: not-allowed;
  }
  & a {
    display: block;
    width: 100%;
    height: 100%;
    color: inherit;
  }
  & .iconButton,
  .button {
    display: inline-flex;
    align-items: center;
    padding: 5px 8px;
    color: inherit;
    & svg {
      align-self: center;
      min-width: ${props => (props.size ? props.size : 14)}px;
      min-height: ${props => (props.size ? props.size : 14)}px;
      @media screen and (min-width: 769px) {
        min-width: ${props => (props.size ? Number(props.size) + 10 : 20)}px;
        min-height: ${props => (props.size ? Number(props.size) + 10 : 20)}px;
      }
    }
    & p {
      margin: 0;
      padding: 3px 0 0 5px;
      text-decoration: none;
    }
  }
`
