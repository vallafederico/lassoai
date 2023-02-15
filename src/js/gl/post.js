import { Vector2 } from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

import { Shader } from "./mat/post/base";

export class Post extends EffectComposer {
  constructor({ renderer, scene, camera }) {
    super(renderer);
    this.isOn = true;
    this.renderer = renderer;

    this.renderPass = new RenderPass(scene, camera);
    this.addPass(this.renderPass);

    this.createPasses();
  }

  createPasses() {
    this.addPass(new Shader());

    this.bloomPass = new UnrealBloomPass(
      new Vector2(window.innerWidth, window.innerHeight),
      2.5, // strength
      0, // radius
      0.35 //  threshold
    );

    this.addPass(this.bloomPass);
  }

  renderPasses(t) {}
}
