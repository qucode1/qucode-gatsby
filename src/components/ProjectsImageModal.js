import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Button from '../components/Button'

class Modal extends React.Component {
  state = {
    serverRendered: true,
  }

  componentDidMount() {
    this.setState({ serverRendered: false })
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el)
  }

  render() {
    const { image, className, closeModal } = this.props
    const { serverRendered } = this.state
    if (!serverRendered) {
      this.modalRoot = document.getElementById('modalRoot')
      this.el = document.createElement('div')
      this.modalRoot.appendChild(this.el)
    }
    return serverRendered
      ? null
      : ReactDOM.createPortal(
          <div className={className}>
            <Button icon="FiX" className="closeBtn" onClick={closeModal} />
            <Img
              fixed
              sizes={image.sizes}
              alt={image.title}
              className="projectImageInnerWrapper"
              outerWrapperClassName="projectImageOuterWrapper"
            />
          </div>,
          this.el
        )
  }
}

const StyledModal = styled(Modal)`
  position: fixed;
  color: white;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  & .closeBtn {
    position: absolute;
    top: 60px;
    right: 60px;
  }
  & .projectImageOuterWrapper {
    width: 70vmin;
    padding-bottom: 70vmin;
    @media screen and (max-width: 768px) {
      width: 90vmin;
      padding-bottom: 90vmin;
    }
  }
  & .projectImageInnerWrapper {
    position: absolute !important;
    width: 100%;
    height: 100%;
  }
`

export default StyledModal
