import {
  Points,
  BufferAttribute,
  PlaneGeometry,
  BoxGeometry,
  BufferGeometry,
} from "three";

import RawInstanceMaterial from "./mat/particle-rand";

export class RandomParticles extends Points {
  constructor(data) {
    super();
    this.data = data;

    this.geometry = new BufferGeometry();

    this.createAttributes();
    this.material = new RawInstanceMaterial();
  }

  createAttributes() {
    const count = 10000;

    const random = new Float32Array(count);
    const randomColor = new Float32Array(count);
    const position = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      random.set([Math.random()], i);
      randomColor.set([Math.random()], i);
      position.set(
        [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1],
        i * 3
      );
    }

    this.geometry.setAttribute("a_random", new BufferAttribute(random, 1));
    this.geometry.setAttribute(
      "a_random_color",
      new BufferAttribute(randomColor, 1)
    );
    this.geometry.setAttribute("position", new BufferAttribute(position, 3));
  }

  render(t, perc) {
    this.material.time = t;
    this.position.z = perc;
    this.material.perc = perc;
    // console.log(t);
    // this.rotation.y = -t;
    // this.rotation.z = t * 0.01;
    this.rotation.x = t;
  }

  resize() {}
}
