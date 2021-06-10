import { Lightning } from "@lightningjs/sdk";

import MenuItem, { MENU_ITEM_HEIGHT, MENU_ITEM_WIDTH, MENU_ITEM_TEXT_COLOR } from "./MenuItem";

const MENU_GUTTER = 40;
const FOCUS_ARROW_WIDTH = 50;
const FOCUS_BG_COLOR = 0xfff20587;

export default class Menu extends Lightning.Component {
  static _template() {
    return {
      FocusBackground: {
        rect: true,
        color: FOCUS_BG_COLOR,
        w: MENU_ITEM_WIDTH + MENU_GUTTER + FOCUS_ARROW_WIDTH,
        h: MENU_ITEM_HEIGHT,
        y: -8,
      },
      FocusArrow: {
        x: MENU_ITEM_WIDTH + MENU_GUTTER,
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

  get items() {
    return this.tag("Items").children
  }

  set items(v) {
    this.tag("Items").children = v.map((el, idx) => {
      return {
        type: MenuItem,
        label: el.label,
        value: el.value,
        y: idx * MENU_ITEM_HEIGHT,
        signals: {
          previousItem: "_previousItem",
          nextItem: "_nextItem"
        },
        passSignals: {
          rightSelect: true,
          enterSelect: true,
        }
      };
    });
  }

  get activeItem() {
    return this.items[this._selectedIndex];
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
}
