import { Points, BufferAttribute, PlaneGeometry, BoxGeometry } from "three";
import RawInstanceMaterial from "./mat/particle-base";

export class Particles extends Points {
  constructor(data) {
    super();
    this.data = data;

    const subd = 100;

    this.geometry = new PlaneGeometry(2, 2, subd, subd);

    this.createAttributes();
    this.material = new RawInstanceMaterial();
  }

  createAttributes() {
    const count = this.geometry.attributes.position.array.length;

    const random = new Float32Array(count / 3);
    const randomColor = new Float32Array(count / 3);

    for (let i = 0; i < count / 3; i++) {
      random.set([Math.random()], i);
      randomColor.set([Math.random()], i);
    }

    this.geometry.setAttribute("a_random", new BufferAttribute(random, 1));
    this.geometry.setAttribute(
      "a_random_color",
      new BufferAttribute(randomColor, 1)
    );
  }

  render(t) {
    // console.log(t);
    // this.rotation.y = t * 0.03;
    // this.rotation.z = t * 0.01;
    // this.rotation.x = t * 0.04;
  }

  resize() {}
}
