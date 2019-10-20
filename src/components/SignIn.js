import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import * as routes from '../constants/routes'
import GoogleLogin from 'react-google-login'
import GameEngine from './game-engine';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Photos = require('googlephotos')

class SignInForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stage: 1,
      albums: [],
      photosClient: null,
      smileAlbum: null,
      otherAlbum: null,
    }

    // this.state.stage = 2
    // this.state.albums = require('../list-photo-res').albums

    this.responseGoogle = this.responseGoogle.bind(this)
  }

  render() {
    const albums = this.state.albums
    const style = {
      height: 333,
      width: 333,
      display: 'inline-block',
      background: '#d9edf7',
      color: '#fff',
      borderRadius: 2,
      border: '1px solid transparent',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Roboto'
    }
    switch (this.state.stage) {
      case 1:
        return (
          <div className="signin">
            <GoogleLogin
              clientId="229443907240-eeo219ivkhikqg860l2q56dplpg69rul.apps.googleusercontent.com"
              buttonText="Login with Google"
              scope="https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.sharing"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogleFail}
            />
          </div>
        )
      case 2:
        const sItems = albums.map((p) => {
          return (<Row><Button onClick={() => this.albumSelect(p.id, "smileAlbum", 3)} key={p.id}>{p.title}</Button></Row>)
        })
        return (
          <Form>
            <Container>
              <Col>
                {sItems}
              </Col>
            </Container>
          </Form>
        )
      case 3:
        var otherAlbum = albums.find((item) => {
          return item.title === "game-other"
        })

        if (otherAlbum !== null) {
          return this.albumSelect(otherAlbum.id, "otherAlbum", 2)
        }

        const oItems = albums.map((p) =>
          <button onClick={() => this.albumSelect(p.id, "otherAlbum", 4)} key={p.id}>{p.title}</button>
        )
        return (
          <ul>{oItems}</ul>
        )
      case 4:
        const photo = this.state.photosClient
        photo.mediaItems.search(this.state.smileAlbum).then((items) => {
          let smiles = items.mediaItems.filter((i) => i.mediaMetadata.photo)
          const origS = JSON.parse(JSON.stringify(smiles))
          return photo.mediaItems.search(this.state.otherAlbum).then((items) => {
            let others = items.mediaItems.filter((i) => i.mediaMetadata.photo)
            const origO = JSON.parse(JSON.stringify(others))

            GameEngine.setImageGetter({
              getWinner: (dim) => {
                if (smiles.length < 1) {
                  smiles = JSON.parse(JSON.stringify(origS))
                }
                return this.convert(smiles.pop(), dim)
              },
              getOther: (dim) => {
                if (others.length < 1) {
                  others = JSON.parse(JSON.stringify(origO))
                }
                return this.convert(others.pop(), dim)
              }
            })

            this.props.history.push(routes.GAME)
          })
        })
          .catch((err) => {
            console.log("ERROR getting photos", err)
          })

        return <div></div>
      default:
        return <div>LOADING</div>
    }
  }

  convert(item, dim) {
    return {
      id: item.id,
      src: `${item.baseUrl}=p-w${dim.w}-h${dim.h}`
    }
  }

  albumSelect(id, album, nextStage) {
    const state = {
      stage: nextStage,
      albums: this.state.albums.filter((s) => s.id !== id)
    }
    state[album] = id
    this.setState(state)
  }

  responseGoogleFail(err) {
    console.log("Sign in err", err)
  }

  responseGoogle(googleUser) {
    const photosClient = new Photos(googleUser.accessToken)
    localStorage.setItem('googleUser', JSON.stringify(googleUser))

    return photosClient.albums.list()
      .then((list) => {
        var state = {
          photosClient,
          albums: list.albums,
          stage: 2,

        }

        var smileAlbum = state.albums.find((item) => {
          return item.title === "game-smile"
        })

        if (smileAlbum !== null && smileAlbum.id !== null) {
          console.log("Found smile album", smileAlbum)
          state["smileAlbum"] = smileAlbum.id
          state.albums = state.albums.filter((s) => s.id !== smileAlbum.id)
          state.stage = 3

          var otherAlbum = state.albums.find((item) => {
            return item.title === "game-other"
          })

          if (otherAlbum !== null && otherAlbum.id !== null) {
            console.log("Found other album", smileAlbum)
            state["otherAlbum"] = otherAlbum.id
            state.albums = state.albums.filter((s) => s.id !== otherAlbum.id)
            state.stage = 4
          }
        }

        return this.setState(state)
      })
      .catch((err) => { console.log("Error login ", err) })
  }
}

export default withRouter(SignInForm)
