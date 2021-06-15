import { Lightning } from '@lightningjs/sdk'

import { IMAGE_WIDTH, IMAGE_HEIGHT, EXPANDED_IMAGE_WIDTH, EXPANDED_IMAGE_HEIGHT } from './constants'

export default class CarouselItem extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: IMAGE_WIDTH,
        h: IMAGE_HEIGHT,
        color: 0xff333333,
      },
      Image: {
        w: IMAGE_WIDTH,
        h: IMAGE_HEIGHT,
        alpha: 0.5,
      },
    }
  }

  _init() {
    this.tag('Image').on('txLoaded', () => {
      console.log('texture loaded: ' + this.tag('Image').src)
      console.log(this.tag('Image').texture)
      this.tag('Image').setSmooth('alpha', 1)
    })

    this.tag('Image').on('txError', () => {
      console.error('texture failed to load: ' + this.tag('Image').src)
    })
  }

  set imgSrc(s) {
    this._src = s
    this.tag('Image').src = s
  }

  onError() {
    // TODO
  }

  onSuccess() {
    // TODO
  }

  _focus() {
    this.tag('Image').patch({
      w: EXPANDED_IMAGE_WIDTH,
      h: EXPANDED_IMAGE_HEIGHT,
      x: -(EXPANDED_IMAGE_WIDTH - IMAGE_WIDTH) / 2,
      y: -(EXPANDED_IMAGE_HEIGHT - IMAGE_HEIGHT) / 2,
    })
  }

  _unfocus() {
    this.tag('Image').patch({
      w: IMAGE_WIDTH,
      h: IMAGE_HEIGHT,
      x: 0,
      y: 0,
    })
  }

  _handleLeft() {
    this.signal('leftSelect', this._src)
  }

  _handleRight() {
    this.signal('rightSelect', this._src)
  }
}
