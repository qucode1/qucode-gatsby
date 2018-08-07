import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Img from 'gatsby-image'

const modalRoot = document.getElementById('modalRoot')

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  render() {
    const { image, className } = this.props
    return ReactDOM.createPortal(
      <div className={className}>
        <Img
          fluid
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
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`

export default StyledModal
