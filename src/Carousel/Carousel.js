import { Lightning } from '@lightningjs/sdk'

import CarouselItem from './CarouselItem'
import { IMAGE_WIDTH, IMAGE_MARGIN } from './constants'

export default class Carousel extends Lightning.Component {
  static _template() {
    return {
      Items: {
        x: IMAGE_MARGIN,
        alpha: 0.5,
      },
    }
  }

  get items() {
    return this.tag('Items').children
  }

  set items(v) {
    this.tag('Items').children = v.map((img, i) => {
      return {
        type: CarouselItem,
        imgSrc: img.imgSrc,
        x: i * (IMAGE_WIDTH + IMAGE_MARGIN) + IMAGE_MARGIN,
        signals: {
          leftSelect: '_previousItem',
          rightSelect: '_nextItem',
        },
      }
    })
    this._resetItems()
  }

  _resetItems() {
    this.tag('Items').patch({ x: 0 })
    this._selectedIndex = 0
  }

  _init() {
    this._selectedIndex = 0
  }

  _setIndex(i) {
    this.tag('Items').setSmooth('x', -(i * (IMAGE_WIDTH + IMAGE_MARGIN)) + 2 * IMAGE_MARGIN)

    this._selectedIndex = i
  }

  _previousItem() {
    if (this._selectedIndex === 0) {
      this.signal('deselect')
    } else {
      this._setIndex(Math.max(0, this._selectedIndex - 1))
      this._refocus()
    }
  }

  _nextItem() {
    this._setIndex(Math.min(this.items.length - 1, this._selectedIndex + 1))
    this._refocus()
  }

  _focus() {
    this.tag('Items').patch({ alpha: 1 })
  }

  _unfocus() {
    this.tag('Items').patch({ alpha: 0.5 })
  }

  _getFocused() {
    return this.tag('Items').children[this._selectedIndex]
  }
}
