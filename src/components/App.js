import React, { Component } from 'react'
import SignIn from './SignIn'
import GamePage from './Game'

import AlbumSelect from './album-select'

const STAGE_0 = 0
const STAGE_LOGGED_IN = 1
const STAGE_ALBUMS_PICKED = 2
const STAGE_GAME_STARTED = 3

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      photosClient: null,
      albums: [],
      smileAlbum: null,
      otherAlbum: null,
      stage: STAGE_0
    }
  }

  loginChange(err, photosClient) {
    if (err) {
      return err
    }

    return photosClient.albums.list()
      .catch((err) => {
        console.error('Error: listing albums ', err)
        throw err
      })
      .then((list) => {
        var update = {
          photosClient,
          albums: list.albums,
          stage: STAGE_LOGGED_IN
        }


        return this.findDefaultAlbums(update, 'game-smile', 'smileAlbum')
          .then(() => {
            return this.findDefaultAlbums(update, 'game-other', 'otherAlbum')
          })
          .catch((err) => {
            console.error('Error: listing albums ', err)
            throw err
          })
      })
  }

  findDefaultAlbums(update, albumName, albumType) {
    var album = update.albums.find((item) => {
      return item.title === albumName
    })

    return this.setAlbum(update, album, albumType)
  }


  setAlbum(update, album, albumType) {
    if (album !== null && album.id !== null) {
      console.log(`Found ${albumType} album`, album)
      update[albumType] = album.id
      update.albums = update.albums.filter((s) => s.id !== album.id)
      return this.state.photosClient.mediaItems.search(update.smileAlbum)
        .then((items) => {
          let photos = items.mediaItems.filter((i) => i.mediaMetadata.photo)
          update[albumType].photos = JSON.parse(JSON.stringify(photos))
          return this.setState(update)
        })
        .then(() => {
          if (update.smileAlbum && update.otherAlbum) {
            update.stage = STAGE_ALBUMS_PICKED
            return this.setState(update)
          }
        })
    }
    return null
  }

  albumChange(err, album, albumType) {
    if (err) {
      return console.error("Error changing album", err)
    }
    return this.setAlbum(this.state, album, albumType)
  }

  render() {
    let stage = this.state.stage
    const overStage = parseInt(localStorage.getItem('stage'))
    if (overStage) {
      console.log("Setting local album")
      this.state.smileAlbum = require("../local-albums").winners.mediaItems
      this.state.otherAlbum = require("../local-albums").others.mediaItems

      stage = STAGE_ALBUMS_PICKED
    }

    switch (stage) {
      case STAGE_0:
        console.log("Stage: 0")
        return (<SignIn loginChange={this.loginChange}> </SignIn>)

      case STAGE_LOGGED_IN:
        console.log("Stage: logged in")
        const albumType = this.state.smileAlbum ? "otherAlbum" : "smileAlbum"
        return (<AlbumSelect albums={this.state.albums} albumType={albumType} onChange={this.albumChange}></AlbumSelect>)

      case STAGE_ALBUMS_PICKED:
        console.log("Stage: game")
        return (<GamePage smileAlbum={this.state.smileAlbum} otherAlbum={this.state.otherAlbum}></GamePage>)

      case STAGE_GAME_STARTED:
        console.log("Stage: game started")
        return null

      default:
        console.error("Stage: unknown stage", stage, typeof stage, STAGE_ALBUMS_PICKED, typeof STAGE_ALBUMS_PICKED)
        return null
    }
  }
}
export default App
