import { RawShaderMaterial, DoubleSide, AdditiveBlending } from "three";

import vertexShader from "./vertex.vert";
import fragmentShader from "./fragment.frag";

import { params } from "../../params.js";
const { part_col1, part_col2, part_col3 } = params.gl;

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
      u_col1: { value: part_col1 },
      u_col2: { value: part_col2 },
      u_col3: { value: part_col3 },
      // * animation
      u_perc: { value: 0 },
      u_speed: { value: 0.0 },
      u_height: { value: 0 },
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
    this.uniforms.u_speed.value = window.sscroll.speed;
    this.uniforms.u_height.value = window.sscroll.percent;

    this.renderGui();
  }

  set perc(p) {
    this.uniforms.u_perc.value = p;
  }

  renderGui() {
    this.uniforms.u_part_low.value = window.UI.particles.particleLow;
    this.uniforms.u_part_high.value = window.UI.particles.particleHigh;

    this.uniforms.u_col2.value = [
      window.UI.particles.r,
      window.UI.particles.g,
      window.UI.particles.b,
    ];
  }
}

// u_t1: { svalue: options?.u_t1 || null },
// u_color_base: {
//   value: [0.3803921568627451, 0.1450980392156863, 0.4549019607843137],
// },
