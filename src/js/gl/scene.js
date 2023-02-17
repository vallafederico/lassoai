import { Scene, Group } from "three";
import Quad from "./quad.js";

import { Particles } from "./particles.js";

export default class extends Scene {
  constructor(data = {}) {
    super();
    this.data = data;

    this.create();
  }

  create() {
    // this.quad = new Quad();

    this.ctrl = new Group();

    this.particles = new Particles();
    this.ctrl.add(this.particles);
    this.add(this.ctrl);
  }

  render(t) {
    if (this.particles) this.particles.render(t);
  }

  resize() {}
}
