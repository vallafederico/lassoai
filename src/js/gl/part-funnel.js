import { Points, BufferAttribute, BufferGeometry } from "three";
import RawInstanceMaterial from "./mat/particle-funnel";

export class FunnelParticles extends Points {
  constructor(data) {
    super();
    this.data = data;

    this.geometry = new BufferGeometry();

    this.createAttributes();
    this.material = new RawInstanceMaterial();
  }

  createAttributes() {
    const count = 20000;

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
    this.material.prog = perc;
  }

  resize() {}
}
