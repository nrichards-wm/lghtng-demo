import { Lightning } from "@lightningjs/sdk"

import Menu, {MENU_GUTTER, MENU_WIDTH} from "./sidemenu/Menu"
import { generateItems } from './utils'

export default class Page extends Lightning.Component {
  static _template() {
    return {
      SubMenu: {
        type: Menu,
        y: 250,
        x: MENU_WIDTH,
        visible: false,
        signals: {
          leftSelect: '_subItemLeftSelected',
          enterSelect: '_subItemEnterSelected',
          itemFocussed: '_subItemFocussed',
        }
      },
      SideMenu: {
        type: Menu,
        y: 250,
        showTouched: true,
        items: [
          { label: "one", value: generateItems(1) },
          { label: "two", value: generateItems(2) },
          { label: "three", value: generateItems(3) },
          { label: "four", value: generateItems(4)}
        ],
        signals: {
          rightSelect: '_sideItemRightSelected',
          enterSelect: '_sideItemEnterSelected',
          itemFocussed: '_sideItemFocussed',
          itemUnfocussed: '_sideItemUnfocussed'
        }
      },
    }
  };

  _init() {
    this._setState("SideMenu");
  }

  static _states() {
    return [
      class SideMenu extends this {
        $enter() {
          this.tag('SideMenu').setSmooth('x', 0)
          this.tag('SubMenu').setSmooth('x', MENU_WIDTH)
        }
        $exit() {
          this.tag('SideMenu').setSmooth('x', - MENU_WIDTH + MENU_GUTTER )
          this.tag('SubMenu').setSmooth('x', MENU_GUTTER)
        }
        _getFocused() {
          return this.tag("SideMenu");
        }
      },
      class SubMenu extends this {
        _getFocused() {
          return this.tag("SubMenu");
        }
      }
    ];
  }

  _sideItemRightSelected(value, label) {
    this._setState("SubMenu");
  }

  _sideItemEnterSelected(value, label) {
    console.log('_sideItemEnterSelected', label, value)
  }

  _sideItemFocussed(value) {
    this.tag("SubMenu").patch({
      items: value,
      visible: true,
    })
  }

  _subItemLeftSelected() {
    this._setState("SideMenu");
  }

  _subItemEnterSelected(value, label) {
    console.log('_subItemEnterSelected', value, label)
  }

  _subItemFocussed(value) {
    console.log('_subItemFocussed', value)
  }
}
