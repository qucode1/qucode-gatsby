import React, { Component } from 'react'
import Layout from '../components/Layout'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { Form, Field } from 'react-final-form'

import Button from '../components/Button'

const required = value => (value ? undefined : 'Required')

const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)

const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`

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
          <p>Email: {profile.email}</p>

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
          <h3>Or send me a message right now:</h3>
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
              >
                <Field name="secret">
                  {({ input, meta }) => (
                    <div className="secret">
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
                    <div>
                      <label>First Name</label>
                      <input
                        {...input}
                        type="text"
                        placeholder="First Name"
                        disabled={meta.submitSucceeded}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="lastName" validate={required}>
                  {({ input, meta }) => (
                    <div aria-hidden>
                      <label>Last Name</label>
                      <input
                        {...input}
                        type="text"
                        placeholder="Last Name"
                        disabled={meta.submitSucceeded}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="age"
                  validate={composeValidators(
                    required,
                    mustBeNumber,
                    minValue(18)
                  )}
                >
                  {({ input, meta }) => (
                    <div>
                      <label>Age</label>
                      <input
                        {...input}
                        type="text"
                        placeholder="Age"
                        disabled={meta.submitSucceeded}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <div className="buttons">
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

const StyledContact = styled(Contact)`
  padding: 10px;
  color: rgba(255, 255, 255, 0.85);
  & .h2 {
    margin: 15px 0;
  }
  & .twitterBtn,
  .githubBtn {
    display: inline-block;
    background-color: transparent;
    box-shadow: none;
    color: rgba(255, 255, 255, 0.85);
    &:hover {
      color: orange;
      background-color: transparent;
      box-shadow: none;
    }
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
