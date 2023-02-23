import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import fragmentShader from "./fragment.frag";
import vertexShader from "./vertex.vert";

export const CopyShader = {
  uniforms: {
    diff_0: { value: null },
    diff_1: { value: null },
    diff_2: { value: null },
    opacity: { value: 0.0 },
    switch1: { value: 0.0 },
    switch2: { value: 1.0 },
  },
  vertexShader,
  fragmentShader,
};

export class MergeShader extends ShaderPass {
  constructor() {
    super(CopyShader);
  }
}
