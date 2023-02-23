import { Scene, Group, WebGLRenderTarget } from "three";
import { FootParticles } from "./part-foot.js";

export default class extends Scene {
  constructor() {
    super();
    this.isActive = true;

    this.createTarget();
    this.create();
  }

  create() {
    this.ctrl = new Group();
    // this.ctrl.scale.set(2, 2, 2);
    this.ctrl.position.z = 1.5;

    this.particles = new FootParticles();
    this.particles.rotation.x = 1.5;

    this.ctrl.add(this.particles);
    this.add(this.ctrl);
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
