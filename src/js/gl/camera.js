import { PerspectiveCamera } from "three";

export default class extends PerspectiveCamera {
  constructor(
    fov = 70,
    aspect = window.innerWidth / window.innerHeight,
    near = 0.1,
    far = 5
  ) {
    super(fov, aspect, near, far);
  }
}
