import { Scene, Group, WebGLRenderTarget } from "three";
// import { FootParticles } from "./part-foot.js";
import { SpiralParticles } from "./part-spiral.js";
import { Transform } from "../modules/animation/transform-bot.js";

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
    // this.ctrl.scale.set(2, 2, 2);
    this.ctrl.position.z = 1;
    // this.ctrl.position.

    // this.particles = new FootParticles();
    // this.particles.rotation.x = 1.5;
    // this.ctrl.add(this.particles);

    this.spiral = new SpiralParticles();
    this.ctrl.add(this.spiral);

    this.add(this.ctrl);
  }

  render(t) {
    if (!this.isActive) return;
    const sceneTime = t * 0.5;

    this.trans?.render();
    // console.log(this.trans.perc);
    // this.ctrl.position.z = -1 + this.trans.perc;

    // if (this.particles) this.particles.render(t, this.trans.perc);
    if (this.spiral) this.spiral.render(sceneTime, this.trans.perc);
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
      element: document.querySelector('[data-dom="footer"]'),
    });

    // this.trans.el.style.border = "1px solid red";
  }

  set animateIn(value) {
    this.spiral.material.uniforms.u_animate_in.value = value;
  }
}
