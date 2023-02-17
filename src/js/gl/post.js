import { Vector2 } from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

// import { Shader } from "./mat/post/base";
import { MergeShader } from "./mat/post/merge";

export class Post extends EffectComposer {
  constructor({ renderer, scene, camera }) {
    super(renderer);
    this.isOn = true;
    this.renderer = renderer;

    this.mergePass = new MergeShader();
    this.addPass(this.mergePass);

    this.createPasses();
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

  set textures({ hero, data }) {
    this.mergePass.material.uniforms.diff_0.value = hero;
    this.mergePass.material.uniforms.diff_1.value = data;
  }

  renderPasses(t) {
    this.renderGui();
  }

  renderGui() {
    this.bloomPass.strength = window.UI.params.bloomStrength;
    this.bloomPass.radius = window.UI.params.bloomRadius;
    this.bloomPass.threshold = window.UI.params.bloomTresh;
  }
}
