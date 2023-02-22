import { RawShaderMaterial, DoubleSide, AdditiveBlending } from "three";

import vertexShader from "./vertex.vert";
import fragmentShader from "./fragment.frag";

export default class extends RawShaderMaterial {
  constructor(options) {
    super({
      vertexShader,
      fragmentShader,
    });

    this.uniforms = {
      u_time: { value: options?.u_time || 0 },
      // ** particle params
      u_part_low: { value: 0.1 },
      u_part_high: { value: 0.9 },
      // ** colors
      u_col1: { value: [0, 0, 0.7] },
      u_col2: { value: [0.9294117647058824, 1, 0] },
      u_col3: {
        value: [0.09411764705882353, 0.09803921568627451, 0.12941176470588237],
      },
    };

    this.side = DoubleSide;
    // this.wireframe= true;
    this.transparent = true;

    this.depthTest = false;
    this.depthWrite = false;
    this.blending = AdditiveBlending;
  }

  set time(t) {
    this.uniforms.u_time.value = t;

    this.renderGui();
  }

  renderGui() {
    this.uniforms.u_part_low.value = window.UI.particles.particleLow;
    this.uniforms.u_part_high.value = window.UI.particles.particleHigh;
  }
}

// u_t1: { svalue: options?.u_t1 || null },
// u_color_base: {
//   value: [0.3803921568627451, 0.1450980392156863, 0.4549019607843137],
// },
