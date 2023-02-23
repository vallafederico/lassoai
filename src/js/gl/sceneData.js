import { Scene, Group, WebGLRenderTarget } from "three";
import { FunnelParticles } from "./part-funnel.js";
import { SphereParticles } from "./part-sphere.js";

export default class extends Scene {
  constructor() {
    super();
    this.isActive = true;

    this.createTarget();
    this.create();
  }

  create() {
    this.ctrl = new Group();
    this.ctrl.position.z = 1.5;
    // this.ctrl.position.y = -0.2;

    this.particles = new FunnelParticles();
    // this.particles.position.z = 1.5;
    this.sphere = new SphereParticles();

    this.ctrl.add(this.particles);
    this.ctrl.add(this.sphere);
    this.add(this.ctrl);

    // this.ctrl.scale.set(0.2, 0.2, 0.2);
  }

  render(t) {
    if (!this.isActive) return;

    if (this.particles) this.particles.render(t);
    if (this.sphere) this.sphere.render(t);
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
