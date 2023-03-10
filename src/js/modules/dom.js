import { Text } from "./animation/text";
import { Title } from "./animation/title";
import { Alpha } from "./animation/alpha";
import { Count } from "./animation/count";
import { Button } from "./animation/button";
import Tween from "gsap";
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

    this.titles = [...document.querySelectorAll('[data-a="title"]')].map(
      (el) => new Title({ element: el })
    );

    this.buttons = [...document.querySelectorAll('[data-a="button"]')].map(
      (el) => new Button({ element: el })
    );

    this.alphas = [...document.querySelectorAll('[data-a="alpha"]')].map(
      (el) => new Alpha({ element: el })
    );

    this.count = [...document.querySelectorAll('[data-a="count"]')].map(
      (el) => new Count({ element: el })
    );
  }

  start() {
    this.texts.forEach((text) => text.start());
    this.titles.forEach((title) => title.start());
    this.buttons.forEach((button) => button.start());
    this.alphas.forEach((alpha) => alpha.start());
    this.count.forEach((count) => count.start());
  }

  // **  Animation

  animateIn() {
    const wrapper = document.querySelector('[data-page="w"]');
    // console.log(wrapper);
    Tween.set(wrapper, { autoAlpha: 0 });
    wrapper.style.visibility = "visible";
    Tween.to(wrapper, {
      autoAlpha: 1,
      duration: 0.5,
      delay: 0.8,
      ease: "slow.out",
      onComplete: () => this.start(),
    });
  }

  // /* --  Pages */
  // transitionOut(page) {
  //   // console.log("DOM•tranOut", page);

  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, 100);
  //   });
  // }

  // transitionIn(page) {
  //   // console.log("DOM•tranIn", page);

  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, 100);
  //   });
  // }
}
