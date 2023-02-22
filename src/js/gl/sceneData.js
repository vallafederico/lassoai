import { Scene, Group, WebGLRenderTarget } from "three";

import { Particles } from "./particles.js";

export default class extends Scene {
  constructor() {
    super();
    this.isActive = false;

    this.createTarget();
    this.create();
  }

  create() {
    this.ctrl = new Group();
    this.particles = new Particles();

    this.ctrl.add(this.particles);
    this.add(this.ctrl);

    // this.ctrl.scale.set(0.2, 0.2, 0.2);
  }

  render(t) {
    if (!this.isActive) return;

    if (this.particles) this.particles.render(t);
  }

  toTarget(renderer, camera) {
    if (!this.isActive) return;

    renderer.setRenderTarget(this.rt);
    renderer.render(this, camera);
    renderer.setRenderTarget(null);
    return this.rt.texture;
  }

  resize() {
    this.createTarget();
  }

  createTarget() {
    this.rt = new WebGLRenderTarget(
      window.innerWidth * window.app.gl.vp.pixelRatio,
      window.innerHeight * window.app.gl.vp.pixelRatio
    );
  }
}
