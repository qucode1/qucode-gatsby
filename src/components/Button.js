import React from 'react'
import styled from 'styled-components'
import Fi from 'react-icons/fi'

const Button = props => {
  const Icon = Fi[props.icon]

  const button = props.icon ? (
    <div className="iconButton">
      <Icon />
      <p>{props.text}</p>
    </div>
  ) : (
    <div className="button">
      <p>{props.text}</p>
    </div>
  )

  return (
    <div className={props.className}>
      {props.link ? (
        <a href={props.link} target="_blank">
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
  & a {
    color: rgba(0, 0, 0, 0.78);
    display: block;
  }
  & .iconButton,
  .button {
    display: inline-flex;
    padding: 5px 8px;
    & svg {
      align-self: center;
      min-width: 14px;
    }
    & p {
      margin: 0;
      padding: 4px 0 0 5px;
      text-decoration: none;
    }
  }
`
