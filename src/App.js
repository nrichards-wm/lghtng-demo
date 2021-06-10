import { Lightning, Utils } from "@lightningjs/sdk";
import Page from "./Page";

export default class App extends Lightning.Component {
  static getFonts() {
    return [
      { family: "Regular", url: Utils.asset("fonts/Roboto-Regular.ttf") }
    ];
  }

  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xff000000
      },
      MainPage: {
        type: Page,
        x: 5
      }
    };
  }

  _init() {}

  _getFocused() {
    return this.tag("MainPage");
  }
}
