import React, { Component } from 'react'
import Layout from '../components/Layout'
import styled, { keyframes } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { Form, Field } from 'react-final-form'

import Button from '../components/Button'

const required = value => (value ? undefined : 'Required')

// const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)

// const minValue = min => value =>
//   isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`

const mustBeEmail = value => {
  const match = value.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  return match && match[0] ? undefined : 'Must be a valid email address'
}

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

const encode = data =>
  Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')

class Contact extends Component {
  onSubmit = values => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...values }),
    })
      .then(res => console.log('form submitted! res:', res))
      .catch(error => console.log('submission error:', error))
  }
  render() {
    const profile = this.props.data.allContentfulPerson.edges[0].node
    return (
      <Layout landing>
        <div className={this.props.className}>
          <h2>Contact Me</h2>
          <div className="contactButtons">
            <Button
              icon="FiMail"
              link={`mailto:${profile.email}`}
              target="_self"
              className="emailBtn"
              size="25"
              text={profile.email}
            />
            <div className="socialButtons">
              {profile.twitter && (
                <Button
                  icon="FiTwitter"
                  link={`https://twitter.com/${profile.twitter}`}
                  className="twitterBtn"
                  size="30"
                  text={profile.twitter}
                />
              )}
              {profile.github && (
                <Button
                  icon="FiGithub"
                  link={`https://github.com/${profile.github}`}
                  className="githubBtn"
                  size="30"
                  text={profile.github}
                />
              )}
            </div>
          </div>

          <Form
            onSubmit={this.onSubmit}
            render={({
              handleSubmit,
              form: { reset },
              submitting,
              submitSucceeded,
              pristine,
              values,
              invalid,
            }) => (
              <form
                onSubmit={handleSubmit}
                data-netlify-honeypot="secret"
                data-netlify="true"
                name="contact"
              >
                <h3>Or send me a message right now:</h3>
                <Field name="secret">
                  {({ input, meta }) => (
                    <div className="secret" aria-hidden>
                      <label>Do not fill this out if you're human!</label>
                      <input
                        {...input}
                        type="text"
                        name="secret"
                        placeholder="Do not fill this out if you're human!"
                      />
                    </div>
                  )}
                </Field>
                <Field name="firstName" validate={required}>
                  {({ input, meta }) => (
                    <div className="field">
                      <label>First Name</label>
                      <input
                        {...input}
                        type="text"
                        placeholder="John"
                        className={`${meta.valid ? 'valid' : ''}${
                          meta.invalid && meta.touched ? ' invalid' : ''
                        }${meta.active ? ' active' : ''}`}
                        disabled={meta.submitSucceeded}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="lastName" validate={required}>
                  {({ input, meta }) => (
                    <div className="field">
                      <label>Last Name</label>
                      <input
                        {...input}
                        type="text"
                        placeholder="Doe"
                        className={`${
                          meta.valid && meta.touched ? 'valid' : ''
                        }${meta.invalid && meta.touched ? ' invalid' : ''}${
                          meta.active ? ' active' : ''
                        }`}
                        disabled={meta.submitSucceeded}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="email"
                  validate={composeValidators(required, mustBeEmail)}
                >
                  {({ input, meta }) => (
                    <div className="field">
                      <label>Email</label>
                      <input
                        {...input}
                        type="email"
                        placeholder="john@doe.com"
                        className={`${
                          meta.valid && meta.touched ? 'valid' : ''
                        }${meta.invalid && meta.touched ? ' invalid' : ''}${
                          meta.active ? ' active' : ''
                        }`}
                        disabled={meta.submitSucceeded}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="message" validate={required}>
                  {({ input, meta }) => (
                    <div className="field">
                      <label>Message</label>
                      <textarea
                        {...input}
                        placeholder="Hi there. Nice to meet you."
                        rows={10}
                        className={`${
                          meta.valid && meta.touched ? 'valid' : ''
                        }${meta.invalid && meta.touched ? ' invalid' : ''}${
                          meta.active ? ' active' : ''
                        }`}
                        disabled={meta.submitSucceeded}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <div className="formButtons">
                  <Button
                    icon={
                      submitSucceeded
                        ? 'FiCheck'
                        : submitting
                          ? 'FiWifi'
                          : 'FiSend'
                    }
                    className={`sendBtn${submitSucceeded && ' success'}`}
                    size="20"
                    text={
                      submitSucceeded
                        ? 'Success'
                        : submitting
                          ? 'Sending...'
                          : 'Submit'
                    }
                    type="submit"
                    disabled={submitting || invalid || submitSucceeded}
                  />
                  <Button
                    icon="FiRotateCcw"
                    className="resetBtn"
                    size="20"
                    text="Reset"
                    type="button"
                    disabled={submitting || pristine}
                    onClick={reset}
                  />
                </div>
              </form>
            )}
          />
        </div>
      </Layout>
    )
  }
}

const autofillAnimation = keyframes`
  to {
    color: white;
    background-color: transparent;
  }
`
const autofillDisabledAnimation = keyframes`
  to {
    color: rgba(255, 255, 255, .7);
    background-color: rgba(0,0,0,.5);
  }
`

const StyledContact = styled(Contact)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  margin: auto;
  color: rgba(255, 255, 255, 0.85);
  @media screen and (min-width: 769px) {
    max-width: calc(100% / 3 * 2);
    padding: 25px;
  }
  & h2,
  h3 {
    margin: 15px 0;
  }
  & .contactButtons {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 0 20px 0;
    @media screen and (min-width: 769px) {
      margin: 10px 0 25px 0;
    }
    & button {
      display: inline-block;
      margin: 0 5px;
      background-color: transparent;
      box-shadow: none;
      color: rgba(255, 255, 255, 0.85);
      &:hover {
        color: orange;
        background-color: transparent;
        box-shadow: none;
      }
    }
  }
  form {
    width: 100%;
    max-width: 380px;
    @media screen and (min-width: 769px) {
      width: 75%;
      min-width: 380px;
      max-width: 500px;
    }
  }
  .field {
    margin: 15px 0;
    & label {
      display: block;
    }
    & input,
    textarea {
      width: 100%;
      padding: 3px;
      margin: 5px 0;
      border: none;
      color: white;
      border-bottom: 2px solid rgba(255, 255, 255, 0.7);
      border-radius: 2px;
      background-color: transparent;
      outline: none;
      transition: 0.25s ease-in-out;
      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
        opacity: 1;
      }
      &:-webkit-autofill {
        -webkit-animation-name: ${autofillAnimation};
        -webkit-animation-fill-mode: both;
      }
      &:-webkit-autofill:disabled {
        -webkit-animation-name: ${autofillDisabledAnimation};
        -webkit-animation-fill-mode: both;
      }
      &:disabled {
        background-color: rgba(0, 0, 0, 0.5);
        cursor: not-allowed;
      }
      &.valid {
        border-color: limegreen;
      }
      &.invalid {
        border-color: tomato;
      }
      &.active {
        border-color: orange;
      }
    }
    & span {
      color: tomato;
    }
  }
  .formButtons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    margin-top: 20px;
  }
  .sendBtn.success {
    background-color: limegreen;
    box-shadow: none;
  }
  .resetBtn {
    color: rgba(0, 0, 0, 0.85);
    background-color: tomato;
    &:disabled {
      background-color: #a51900;
    }
    &:hover:not(:disabled) {
      background-color: rgb(255, 118, 91);
    }
  }
  .secret {
    visibility: hidden;
    height: 0;
    width: 0;
  }
`

export default props => (
  <StaticQuery
    query={graphql`
      query contactQuery {
        allContentfulPerson {
          edges {
            node {
              id
              name
              email
              twitter
              github
            }
          }
        }
      }
    `}
    render={data => <StyledContact data={data} {...props} />}
  />
)
