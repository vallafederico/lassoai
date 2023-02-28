import { Text } from "./animation/text";
import { Alpha } from "./animation/alpha";
import { Count } from "./animation/count";
// import { Transform } from "./animation/transform";

export default class {
  constructor() {
    this.create();
  }

  resize() {}

  render(t) {}

  create() {
    this.texts = [
      ...document.querySelectorAll(
        '[data-a="char"],[data-a="word"],[data-a="line"]'
      ),
    ].map((el) => new Text({ element: el }));

    this.alphas = [...document.querySelectorAll('[data-a="alpha"]')].map(
      (el) => new Alpha({ element: el })
    );

    this.count = [...document.querySelectorAll('[data-a="count"]')].map(
      (el) => new Count({ element: el })
    );
  }

  destroy() {
    this.texts.forEach((text) => text.animateOut());
  }

  /* --  Pages */
  transitionOut(page) {
    // console.log("DOM•tranOut", page);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }

  transitionIn(page) {
    // console.log("DOM•tranIn", page);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }
}
