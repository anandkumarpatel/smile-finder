import React, { Component } from 'react'

import {
  Thumbnail
} from 'react-bootstrap/lib'

class Pic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isClicked: false
    }
  }

  render() {
    const isClicked = this.state.isClicked
    const image = this.props.image
    const src = isClicked ? "https://mbtskoudsalg.com/images/x-png-transparent-2.png" : image.src
    return <Thumbnail className="pic" href="#" src={src} onClick={this.onClick(image)} />
  }

  onClick(image) {
    return (event) => {
      this.setState({
        isClicked: true
      })
      this.props.onClick(image)
    }
  }
}

export default Pic
