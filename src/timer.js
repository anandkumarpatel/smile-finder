import React, { Component } from 'react'
import {
  ProgressBar
} from 'react-bootstrap/lib'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.start = this.props.start
    this.onFinish = this.props.onFinish
    this.end = this.props.end
    this.state = ({
      timeLeft: "0",
      progress: 0
    })
  }

  componentDidMount() {
    this.timer = setInterval(this.tick.bind(this), 50)
  }

  componentWillUnmount() {
    this.clear()
  }

  clear() {
    clearInterval(this.timer)
  }

  tick() {
    const elapsed = (Date.now() - this.start) / 1000
    this.setState({
      timeLeft: (this.end - elapsed).toFixed(1),
      progress: ((elapsed / this.end) * 100).toFixed(2)
    })
    if (parseInt(this.state.timeLeft, 10) <= 0) {
      this.finish()
    }
  }

  finish() {
    this.clear()
    this.onFinish()
  }

  render() {
    return <ProgressBar active
      striped={true}
      label={this.state.timeLeft}
      bsStyle={this.state.level}
      now={this.state.progress} />
  }
}
export default Timer

