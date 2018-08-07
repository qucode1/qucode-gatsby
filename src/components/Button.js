import React from 'react'
import styled from 'styled-components'
import Fi from 'react-icons/fi'

const Button = props => {
  const Icon = Fi[props.icon]

  const button = props.icon ? (
    <div className="iconButton">
      <Icon />
      {props.text && <p>{props.text}</p>}
    </div>
  ) : (
    <div className="button">{props.text && <p>{props.text}</p>}</div>
  )

  return (
    <div {...props}>
      {props.link ? (
        <a href={props.link} target="_blank" rel="noopener noreferrer">
          {button}
        </a>
      ) : (
        <div className="button">{button}</div>
      )}
    </div>
  )
}

export default styled(Button)`
  background-color: orange;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: #ffba3d;
  }
  & a {
    color: rgba(0, 0, 0, 0.78);
    display: block;
    width: 100%;
    height: 100%;
  }
  & .iconButton,
  .button {
    display: inline-flex;
    align-items: center;
    padding: 5px 8px;
    & svg {
      align-self: center;
      min-width: ${props => (props.size ? props.size : 14)}px;
      min-height: ${props => (props.size ? props.size : 14)}px;
    }
    & p {
      margin: 0;
      padding: 3px 0 0 5px;
      text-decoration: none;
    }
  }
`
