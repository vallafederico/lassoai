import gsap from "gsap";
import { Observe } from "../../util/observe";

// NEEDS CHECKING!

export class Button extends Observe {
  constructor({ element, anim }) {
    super({
      element,
      config: {
        root: null,
        margin: "10px",
        threshold: 0.8,
      },
    });

    this.anim = {
      d: 0.1,
      ease: "expo.out",
      delay: 0,
      // each: 0.05,
      // from: "start",
      once: false,
      transformOrigin: "bottom center",
      ...anim,
    };

    this.params = {
      in: {
        // autoAlpha: 1,
        y: "0%",
        // x: "0%",
        // scaleY: 1,
      },
      out: {
        // autoAlpha: 0,
        y: "40%",
        // x: "5%",
        // scaleY: 0.85,
      },
    };

    this.element = element;
    this.animated = this.element;

    this.setOut();
  }

  isIn() {
    this.animateIn();
    if (this.anim.once) this.stop();
  }

  isOut() {
    this.setOut();
  }

  animateIn() {
    if (this.animation) this.animation.kill();
    this.animated.classList.add("inview");

    this.animation = gsap.to(this.animated, {
      ...this.params.in,
      duration: this.anim.d,
      ease: this.anim.ease,
      delay: this.anim.delay,
    });
  }

  animateOut() {
    this.stop();
    if (this.animation) this.animation.kill();
    this.animation = gsap.to(this.animated, {
      ...this.params.out,
    });
  }

  setIn() {
    if (this.animation) this.animation.kill();
    gsap.set(this.animated, { autoAlpha: 1 });
  }

  setOut() {
    if (this.animation) this.animation.kill();
    this.animated.classList.remove("inview");

    gsap.set(this.animated, {
      ...this.params.out,
    });
  }
}
