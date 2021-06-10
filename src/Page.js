import { Lightning } from "@lightningjs/sdk";

import Menu from "./sidemenu/Menu";

export default class Page extends Lightning.Component {
  static _template() {
    return {
      SideMenu: {
        type: Menu,
        y: 250,
        items: [
          { label: "one", value: "1234" },
          { label: "two", value: "2345" },
          { label: "three", value: "4567" },
          { label: "four", value: "6798" }
        ],
        signals: {
          rightSelect: '_menuItemRightSelected',
          enterSelect: '_menuItemEnterSelected',
        }
      }
    };
  }

  _init() {
    this._setState("SideMenu");
  }

  static _states() {
    return [
      class SideMenu extends this {
        _getFocused() {
          return this.tag("SideMenu");
        }
      }
    ];
  }

  _menuItemRightSelected(label, value) {
    console.log('menuItemRightSelected', label, value)
  }

  _menuItemEnterSelected(label, value) {
    console.log('menuItemEnterSelected', label, value)
  }
}
