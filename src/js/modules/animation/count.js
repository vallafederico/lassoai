import gsap from "gsap";
import { Observe } from "../../util/observe";

export class Count extends Observe {
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
      d: 1.2,
      ease: "linear",
      delay: 0.1,
      // each: 0.05,
      from: "start",
      once: false,
      ...anim,
    };

    this.ctrl = {
      val: 0,
    };

    this.element = element;
    this.animated = this.element;
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
    console.log("animatein");
    this.animation = gsap.to(this.ctrl, {
      val: 88,
      duration: this.anim.d,
      ease: this.anim.ease,
      delay: this.anim.delay,
      onUpdate: () => {
        this.animated.innerHTML = Math.floor(this.ctrl.val);
      },
    });
  }

  animateOut() {
    this.stop();
    if (this.animation) this.animation.kill();
  }

  setIn() {
    if (this.animation) this.animation.kill();
    // gsap.set(this.animated, { autoAlpha: 1 });
  }

  setOut() {
    if (this.animation) this.animation.kill();
    gsap.set(this.ctrl, {
      val: 0,
      onUpdate: () => {
        this.animated.innerHTML = Math.floor(this.ctrl.val);
      },
    });
  }
}
