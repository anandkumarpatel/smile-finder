/*
Image Object: {
  src:
  id:
}

*/
const staticItems = require('../media-items')

class GameEngine {
  constructor() {
    this.imageGetter = null
  }

  getGame(dim) {
    this.checkGetter()
    const winner = this.imageGetter.getWinner(dim)
    const others = [
      this.imageGetter.getOther(dim),
      this.imageGetter.getOther(dim),
      this.imageGetter.getOther(dim),
      this.imageGetter.getOther(dim),
      this.imageGetter.getOther(dim),
    ]

    return {
      winner,
      others
    }

  }

  checkGetter() {
    if (!this.imageGetter) {
      // throw new Error("imageGetter not set")
      console.error("Image not set")
      this.imageGetter = {
        getOther: (dim) => {
          return convert(staticItems.others.mediaItems.pop(), dim)
        },
        getWinner: (dim) => {
          return convert(staticItems.winners.mediaItems.pop(), dim)
        }
      }
    }
  }

  setImageGetter(ig) {
    this.imageGetter = ig
  }
}

const convert = (item, dim) => {
  return {
    id: item.id,
    src: `${item.baseUrl}=p-w${dim.w}-h${dim.h}`
  }
}

export default new GameEngine()
