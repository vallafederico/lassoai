import { printSignature } from "./modules/signature";
import Tween from "gsap";

import Dom from "./modules/dom";
import Viewport from "./modules/viewport";
import Scroll from "./modules/scroll";

// import Pages from "./modules/pages";
import { Sound } from "./gl/sound.js";

import Gl from "./gl/gl.js";

import { UI } from "./modules/gui";

class App {
  constructor() {
    console.time("startup");
    this.body = document.querySelector("body");
    this.viewport = new Viewport();

    this.time = 0;

    window.UI = new UI();
    this.init();
  }

  async init() {
    this.scroll = new Scroll();
    // this.pages = new Pages();
    this.dom = new Dom();

    this.gl = new Gl();
    await this.gl.init();

    this.initEvents();
    this.render();

    this.animateIn(); // startup

    this.sound = new Sound();

    console.timeEnd("startup");
  }

  animateIn() {
    this.dom?.animateIn();
    this.gl?.animateIn();
  }

  initEvents() {
    // prettier-ignore
    new ResizeObserver((entry) => this.resize(entry[0])).observe(this.body);
  }

  resize({ contentRect }) {
    this.viewport?.resize();
    this.dom?.resize();
  }

  render() {
    // this.time += 0.1;
    this.scroll?.render();
    this.dom?.render();

    window.requestAnimationFrame(this.render.bind(this));
    this.sound?.render();
  }

  /* Events */
}

window.app = new App();
// printSignature();
