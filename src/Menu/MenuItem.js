import { Lightning } from "@lightningjs/sdk";
import {MENU_ITEM_HEIGHT, MENU_ITEM_TEXT_COLOR, MENU_WIDTH, SELECTED_BG_OFFSET, MENU_GUTTER} from './constants'

export default class MenuItem extends Lightning.Component {
  static _template() {
    return {
      SlideLine: {
        rect: true,
        visible: false,
        w: 0,
        h: SELECTED_BG_OFFSET,
        x: -MENU_GUTTER,
        y: MENU_ITEM_HEIGHT - SELECTED_BG_OFFSET * 2,
        color: MENU_ITEM_TEXT_COLOR,
      },
      Label: {
        text: { text: "", fontFace: "Regular", fontSize: 50, color: MENU_ITEM_TEXT_COLOR }
      }
    };
  }

  _init() {
    this._slideLineAnimation = this.tag("SlideLine").animation({
      delay: 0.1, duration: 0.3, repeat: 0, stopMethod: 'immediate', actions:[
        {p:'w', v:{0:0, 1:MENU_WIDTH}}
      ]
    });
  }

  set label(v) {
    this._label = v
    this.tag("Label").patch({ text: { text: v }})
  }

  set value(v) {
    this._val = v;
  }

  get value() {
    return this._val;
  }

  _focus() {
    this.signal('itemFocussed', this._val, this._label)
    this.tag("SlideLine").patch({ visible: true })
    this._slideLineAnimation.start()
  }

  _unfocus() {
    this.signal('itemUnfocussed', this._val, this._label)
    this.tag("SlideLine").patch({ visible: false })
    this._slideLineAnimation.stop()
  }

  _handleUp() {
    this.signal("previousItem");
  }

  _handleDown() {
    this.signal("nextItem");
  }

  _handleLeft() {
    this.signal("leftSelect", this._val, this._label);
  }

  _handleRight() {
    this.signal("rightSelect", this._val, this._label);
  }

  _handleEnter() {
    this.signal("enterSelect", this._val, this._label);
  }
}
