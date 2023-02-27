import { Scene, Group, WebGLRenderTarget } from "three";
import { FunnelParticles } from "./part-funnel.js";
import { SphereParticles } from "./part-sphere.js";

import { Transform } from "../modules/animation/transform-mid.js";

export default class extends Scene {
  constructor() {
    super();
    this.isActive = true;

    this.initEvents();
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

    this.trans?.render();
    // console.log(this.trans.perc);

    this.ctrl.rotation.y = window.app.gl.mouse.ex * 0.05 + this.trans.perc;
    // this.ctrl.rotation.x = window.app.gl.mouse.ey * 0.05;

    let { perc } = this.trans;
    perc *= 2;
    this.sphere.scale.set(perc, perc, perc);

    if (this.particles) this.particles.render(t, this.trans.perc);
    if (this.sphere) this.sphere.render(t, this.trans.perc);
  }

  toTarget(renderer, camera) {
    if (!this.isActive) return;

    renderer.setRenderTarget(this.rt);
    renderer.render(this, camera);
    renderer.setRenderTarget(null);
    return this.rt.texture;
  }

  resize() {
    this.trans?.resize();
    this.createTarget();
  }

  createTarget() {
    this.rt = new WebGLRenderTarget(
      window.innerWidth * window.app.gl.vp.pixelRatio,
      window.innerHeight * window.app.gl.vp.pixelRatio
    );
  }

  // ANIMATION
  initEvents() {
    this.trans = new Transform({
      element: document.querySelector('[data-dom="data"]'),
    });
    // console.log(this.trans);
    // this.trans.el.style.border = "1px solid red";
  }
}
