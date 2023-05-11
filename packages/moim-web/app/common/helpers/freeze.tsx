import { isBrowser } from "./envChecker";
const { disablePageScroll, enablePageScroll } = require("scroll-lock");

function freezeScrollEvent(e: Event) {
  if (e.target === e.currentTarget) {
    e.stopImmediatePropagation();
  }
}

export default class Freeze {
  private static openCount: number = 0;
  private opened: boolean = false;

  public on() {
    if (isBrowser() && !this.opened) {
      if (!Freeze.openCount) {
        window.addEventListener("scroll", freezeScrollEvent, true);
        document.addEventListener("scroll", freezeScrollEvent, true);
        disablePageScroll(document.documentElement);
      }
      Freeze.openCount++;
      this.opened = true;
    }
  }

  public off() {
    if (isBrowser() && this.opened) {
      Freeze.openCount--;
      if (!Freeze.openCount) {
        enablePageScroll(document.documentElement);
        window.removeEventListener("scroll", freezeScrollEvent, true);
        document.removeEventListener("scroll", freezeScrollEvent, true);
      }
      this.opened = false;
    }
  }
}
