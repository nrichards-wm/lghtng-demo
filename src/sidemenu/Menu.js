import { Lightning } from "@lightningjs/sdk";
import isEqual from 'lodash/isEqual'

import MenuItem, { MENU_ITEM_HEIGHT, MENU_ITEM_WIDTH, MENU_ITEM_TEXT_COLOR } from "./MenuItem";

const FOCUS_ARROW_WIDTH = 50;
const FOCUS_BG_COLOR = 0xfff20587;
const TOUCHED_BG_COLOR = 0xff04b2d9;
const SELECTED_BG_OFFSET = -8;

export const MENU_GUTTER = 40;
export const MENU_WIDTH = MENU_ITEM_WIDTH + MENU_GUTTER + FOCUS_ARROW_WIDTH

export default class Menu extends Lightning.Component {
  static _template() {
    return {
      TouchedBackground: {
        rect: true,
        color: TOUCHED_BG_COLOR,
        w: MENU_WIDTH,
        h: MENU_ITEM_HEIGHT,
        y: SELECTED_BG_OFFSET,
        visible: false,
      },
      FocusBackground: {
        rect: true,
        color: FOCUS_BG_COLOR,
        w: MENU_WIDTH,
        h: MENU_ITEM_HEIGHT,
        y: SELECTED_BG_OFFSET,
        visible: false,
      },
      FocusArrow: {
        x: MENU_ITEM_WIDTH + MENU_GUTTER,
        visible: false,
        text: { text: ">", fontFace: "Regular", fontSize: 50, color: MENU_ITEM_TEXT_COLOR }
      },
      Items: {
        x: MENU_GUTTER
      }
    };
  }

  _init() {
    this._selectedIndex = 0
  }

  set showTouched(showTouched) {
    this._showTouched = showTouched
  }

  get items() {
    return this.tag("Items").children
  }

  set items(v) {
    if(!isEqual(v, this.dataItems)) {
      this.dataItems = v
      this.tag("Items").children = v.map((el, idx) => {
        return {
          type: MenuItem,
          label: el.label,
          value: el.value,
          y: idx * MENU_ITEM_HEIGHT,
          signals: {
            previousItem: "_previousItem",
            nextItem: "_nextItem",
            itemFocussed: "_itemFocussed",
            itemUnfocussed: "_itemUnfocussed",
          },
          passSignals: {
            leftSelect: true,
            rightSelect: true,
            enterSelect: true,
          }
        };
      });
      this._resetItems()
    }
  }

  get activeItem() {
    return this.items[this._selectedIndex];
  }

  _resetItems() {
    this.tag("Items").patch({ y: 0 })
    this.tag("TouchedBackground").patch({ visible: false })
    this._selectedIndex = 0
  }

  _setIndex(i) {
    this.tag("Items").setSmooth("y", i * -(90));

    this._selectedIndex = i;
  }

  _getFocused() {
    return this.tag("Items").children[this._selectedIndex];
  }

  _previousItem() {
    this._setIndex(Math.max(0, this._selectedIndex - 1));
    this._refocus();
  }

  _nextItem() {
    this._setIndex(Math.min(this.items.length - 1, this._selectedIndex + 1));
    this._refocus();
  }

  _itemFocussed(value, label) {
    this.signal('itemFocussed', value, label)
    this.tag("FocusArrow").patch({ visible: true })
    this.tag("FocusBackground").patch({ visible: true })
    if(this._showTouched) this.tag("TouchedBackground").patch({ visible: true })
  }

  _itemUnfocussed(value, label) {
    this.signal('itemUnfocussed', value, label)
    this.tag("FocusArrow").patch({ visible: false })
    this.tag("FocusBackground").patch({ visible: false })
  }
}
