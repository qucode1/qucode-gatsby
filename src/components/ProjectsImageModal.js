import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Button from '../components/Button'

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      serverRendered: true,
      images: this.props.images,
      index: this.props.index,
    }
  }

  componentDidMount() {
    this.setState({ serverRendered: false })
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el)
  }
  changeImage = direction => {
    this.setState(prevState => {
      return direction === 'next'
        ? prevState.index < this.props.images.length - 1
          ? { index: ++prevState.index }
          : { index: 0 }
        : prevState.index > 0
          ? { index: --prevState.index }
          : { index: this.props.images.length - 1 }
    })
  }
  render() {
    const { images, className, closeModal } = this.props
    const { serverRendered, index } = this.state
    const image = images[index]

    if (!serverRendered) {
      this.modalRoot = document.getElementById('modalRoot')
      if (!this.el) {
        this.el = document.createElement('div')
        this.modalRoot.appendChild(this.el)
      }
    }
    return serverRendered
      ? null
      : ReactDOM.createPortal(
          <div className={className}>
            <Button icon="FiX" className="closeBtn" onClick={closeModal} />

            <Button
              icon="FiChevronLeft"
              className="galleryControl"
              onClick={() => this.changeImage('prev')}
            />

            <Img
              fixed
              sizes={image.sizes}
              alt={image.title}
              className="projectImageInnerWrapper"
              outerWrapperClassName="projectImageOuterWrapper"
            />
            <Button
              icon="FiChevronRight"
              className="galleryControl"
              onClick={() => this.changeImage('next')}
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
