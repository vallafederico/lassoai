import { Scene, Group, WebGLRenderTarget, NearestFilter } from "three";

import { RandomParticles } from "./part-random.js";
import { HeroParticles } from "./part-hero.js";

import { Transform } from "../modules/animation/transform-full.js";

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
    this.ctrl.position.z = 1;

    this.randomParticles = new RandomParticles();
    this.randomParticles.scale.set(1.5, 1.5, 1.5);
    this.ctrl.add(this.randomParticles);

    this.heroParticles = new HeroParticles();
    this.heroParticles.scale.set(2.5, 2.5, 2.5);
    this.heroParticles.rotation.z = 0.5;
    this.ctrl.add(this.heroParticles);

    this.add(this.ctrl);
  }

  render(t) {
    if (!this.isActive) return;
    const sceneTime = t * 2;

    this.trans?.render();
    // console.log(this.trans.perc);

    if (this.randomParticles)
      this.randomParticles.render(sceneTime, this.trans.perc);
    if (this.heroParticles)
      this.heroParticles.render(sceneTime, this.trans.perc);
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
    this.rt.texture.minFilter = this.rt.texture.magFilter = NearestFilter;
  }

  // ANIMATION
  initEvents() {
    this.trans = new Transform({
      element: document.querySelector('[data-dom="hero"]'),
    });
  }

  set animateIn(value) {
    this.heroParticles.material.uniforms.u_animate_in.value = value;
  }
}
