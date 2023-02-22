import { Scene, Group, WebGLRenderTarget, NearestFilter } from "three";

import { RandomParticles } from "./part-random.js";

export default class extends Scene {
  constructor() {
    super();
    this.isActive = true;

    this.createTarget();
    this.create();
  }

  create() {
    this.ctrl = new Group();
    this.ctrl.position.z = 1;

    this.randomParticles = new RandomParticles();
    this.randomParticles.scale.set(1.5, 1.5, 1.5);
    this.ctrl.add(this.randomParticles);

    this.add(this.ctrl);
  }

  render(t) {
    if (!this.isActive) return;
    if (this.randomParticles) this.randomParticles.render(t);
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
    this.rt.texture.minFilter = this.rt.texture.magFilter = NearestFilter;
  }
}
