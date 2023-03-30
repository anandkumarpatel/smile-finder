/*
Image Object: {
  src:
  id:
}

*/

function clone(a) {
  return GameEngine.shuffle(JSON.parse(JSON.stringify(a)))
}

class GameEngine {
  constructor(smileAlbum, otherAlbum) {
    this.original = {
      smileAlbum: clone(smileAlbum),
      otherAlbum: clone(otherAlbum),
    }

    this.current = {
      smileAlbum: clone(smileAlbum),
      otherAlbum: clone(otherAlbum),
    }
  }

  get(dim, albumType) {
    if (this.current[albumType].length < 1) {
      this.current[albumType] = clone(this.original[albumType])
    }
    return this.convert(this.current[albumType].pop(), dim)
  }

  convert(item, dim) {
    return {
      id: item.id,
      src: `${item.baseUrl}=p-w${dim.w}-h${dim.h}`
    }
  }

  getGame(dim) {
    const winner = this.get(dim, "smileAlbum")
    const others = [
      this.get(dim, "otherAlbum"),
      this.get(dim, "otherAlbum"),
      this.get(dim, "otherAlbum"),
      this.get(dim, "otherAlbum"),
      this.get(dim, "otherAlbum"),
    ]

    return {
      winner,
      others
    }
  }
}

export default GameEngine


GameEngine.shuffle = (a) => {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

