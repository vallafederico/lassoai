import { Vector2 } from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import Tween from "gsap";

// import { Shader } from "./mat/post/base";
import { MergeShader } from "./mat/post/merge";

import { Transform } from "../modules/animation/transform";

export class Post extends EffectComposer {
  constructor({ renderer, scene, camera }) {
    super(renderer);
    this.isOn = true;
    this.renderer = renderer;

    this.mergePass = new MergeShader();
    this.addPass(this.mergePass);

    this.createPasses();
    this.initEvents();
  }

  createPasses() {
    this.bloomPass = new UnrealBloomPass(
      new Vector2(window.innerWidth, window.innerHeight),
      2.5, // strength
      0, // radius
      0.35 //  threshold
    );

    this.addPass(this.bloomPass);
  }

  set textures({ hero, data, foot }) {
    this.mergePass.material.uniforms.diff_0.value = hero;
    this.mergePass.material.uniforms.diff_1.value = data;
    this.mergePass.material.uniforms.diff_2.value = foot;
  }

  renderPasses(t) {
    this.renderGui();

    this.trans?.forEach((el) => el.render());
    this.mergePass.material.uniforms.switch1.value = this.trans[0].perc;
    this.mergePass.material.uniforms.switch2.value = this.trans[1].perc;
    // this.mergePass.material.uniforms.u_mouse.value = [
    //   (window.app.gl.mouse.ex + 1) / 2,
    //   (window.app.gl.mouse.ey + 1) / 2,
    // ];
    // this.bloomPass.strength += this.trans[0];
  }

  renderGui() {
    this.bloomPass.strength = window.UI.params.bloomStrength;
    this.bloomPass.radius = window.UI.params.bloomRadius;
    this.bloomPass.threshold = window.UI.params.bloomTresh;
  }

  resize() {
    this.setSize(window.innerWidth, window.innerHeight);
    this.trans?.forEach((el) => el.resize());
    // this.bloomPass.setSize(window.innerWidth, window.innerHeight);
  }

  // ** Animation
  initEvents() {
    this.trans = [...document.querySelectorAll('[data-dom="trans"]')].map(
      (el) => {
        return new Transform({
          element: el,
        });
      }
    );
  }

  animateIn(d = 1) {
    Tween.to(this.mergePass.material.uniforms.u_start, {
      value: 1,
      duration: d,
      delay: 0.5,
      ease: "expo.out",
    });
  }
}
