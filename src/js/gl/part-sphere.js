import { Points, BufferAttribute, BufferGeometry } from "three";
import RawInstanceMaterial from "./mat/particle-sphere";

export class SphereParticles extends Points {
  constructor(data) {
    super();
    this.data = data;

    this.geometry = new BufferGeometry();

    this.createAttributes();
    this.material = new RawInstanceMaterial();
  }

  createAttributes() {
    const count = 8000;

    const random = new Float32Array(count);
    const randomColor = new Float32Array(count);
    const position = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      random.set([Math.random()], i);
      randomColor.set([Math.random()], i);
    }

    position.set(computeFibonacciSphere(count, 0.06));

    this.geometry.setAttribute("a_random", new BufferAttribute(random, 1));
    this.geometry.setAttribute(
      "a_random_color",
      new BufferAttribute(randomColor, 1)
    );
    this.geometry.setAttribute("position", new BufferAttribute(position, 3));
  }

  render(t) {
    this.material.time = t;
    // console.log(t);
    this.rotation.y = -t * 5;
    this.rotation.z = t * 5 + Math.sin(t);
    // this.rotation.x = t;
  }

  resize() {}
}

function computeFibonacciSphere(samples = 1000, bounds = 0.1) {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (var i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;

    const radius = Math.sqrt(1 - y * y);

    const theta = phi * i;

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    points.push(x * bounds, y * bounds, z * bounds);
  }

  return points;
}
