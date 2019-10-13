import React, { Component } from 'react'

import './App.css'
import Pic from './Pic'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import GameEngine from './game-engine';

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sizes: {
        xs: 7,// 48px per box (576px max)
        sm: 5, // 64px (768px)
        md: 4, // 82.6px (992px)
        lg: 4, // 100 px (1200px)
        xl: 4, // infinity/12 px  (infinity)
      },
      score: 0
    }
    this.onClick = this.onClick.bind(this)
    this.colGen = this.colGen.bind(this)
    this.rowGen = this.rowGen.bind(this)
    this.gridGen = this.gridGen.bind(this)
    this.updateImages = this.updateImages.bind(this)
    this.getImages = this.getImages.bind(this)
    setTimeout(() => {
      this.updateImages()
    }, 1);

  }

  onClick(item) {
    if (item.isWinner) {
      this.setState({
        score: this.state.score + 1
      })
      return this.updateImages()
    }
  }

  colGen(item) {
    return <Col key={item.id} xs={this.state.sizes.xs} sm={this.state.sizes.sm} md={this.state.sizes.md} lg={this.state.sizes.lg}>
      <Pic image={item} onClick={this.onClick} />
    </Col>
  }

  rowGen(items) {
    let out = items.map((item) => {
      return this.colGen(item)
    })
    return <Row className="show-grid">
      {out}
    </Row >
  }

  gridGen(items) {
    return <Container>
      {this.rowGen(items)}
    </Container>
  }

  updateImages() {
    this.setState({
      images: this.getImages()
    })
  }

  getImages() {
    const game = GameEngine.getGame({
      h: 333,
      w: 333
    })

    const images = [game.winner].map((i) => {
      i.isWinner = true
      return i
    }).concat(game.others.map((i) => {
      i.isWinner = false
      return i
    }))

    return this.shuffle(images)
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  getLoader() {
    return <div>hi</div>
  }

  onFinish() {
    this.updateImages()
  }

  render() {
    let out = this.getLoader()
    if (this.state.images) {
      out = this.gridGen(this.state.images)
    }
    return (
      <div className="App">
        <h1 className="App-title">Click on the <span role="img" aria-label="Smile">😃</span> </h1>
        {out}
        <h1> Score: {this.state.score}</h1>
      </div >
    )
  }
}

export default Game
