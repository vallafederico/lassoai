import { Scene } from "three";
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

    this.particles = new Particles();
    this.add(this.particles);
  }

  render(t) {
    if (this.quad) this.quad.render(t);
  }

  resize() {}
}
