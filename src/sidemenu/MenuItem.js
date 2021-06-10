import { Lightning } from "@lightningjs/sdk";

export const MENU_ITEM_HEIGHT = 90;
export const MENU_ITEM_WIDTH = 300;
export const MENU_ITEM_TEXT_COLOR = 0xff000000;

export default class MenuItem extends Lightning.Component {
  static _template() {
    return {
      text: { text: "", fontFace: "Regular", fontSize: 50, color: MENU_ITEM_TEXT_COLOR }
    };
  }

  set label(v) {
    this.text.text = v;
  }

  get label() {
    return this.text.text;
  }

  set value(v) {
    this.val = v;
  }

  get value() {
    return this.val;
  }

  _focus() {
    console.log(`focus:${this.label}`)
  }

  _unfocus() {
    console.log(`unfocus:${this.label}`)
  }

  _handleUp() {
    this.signal("previousItem");
  }

  _handleDown() {
    this.signal("nextItem");
  }

  _handleRight() {
    this.signal("rightSelect", this.val, this.text.text);
  }

  _handleEnter() {
    this.signal("enterSelect", this.val, this.text.text);
  }
}