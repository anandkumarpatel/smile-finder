import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class AlbumSelect extends Component {
  render() {
    const albums = this.props.albums
    const albumType = this.props.albumType

    const sItems = albums.map((album) => {
      return (
        <Row>
          <Button onClick={() => this.select(album, albumType)} key={album.id}>
            {album.title}
          </Button>
        </Row>
      )
    })

    const type = albumType === "smileAlbum" ? "full of smiles" : "without smiles"
    return (
      <Form>
        Pick Album {type}.
        <Container>
          <Col>
            {sItems}
          </Col>
        </Container>
      </Form>
    )
  }

  select(album, albumType) {
    return this.props.onChange(null, album, albumType)
  }
}

export default AlbumSelect
