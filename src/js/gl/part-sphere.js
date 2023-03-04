import { Points, BufferAttribute, BufferGeometry } from "three";
import RawInstanceMaterial from "./mat/particle-sphere";

export class SphereParticles extends Points {
  constructor(data) {
    super();
    this.data = data;

    this.geometry = new BufferGeometry();

    this.anim = {
      y: 0,
    };

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

    position.set(computeFibonacciSphere(count, 0.05));

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

    this.rotation.y = -t * 5 + perc * 4;
    this.rotation.z = t * 5 + Math.sin(t) + perc * 4;
    this.rotation.x = t * 5 + Math.sin(t * 3);

    let scaledPerc = perc * 1.8;
    this.scale.set(scaledPerc, scaledPerc, scaledPerc);

    this.position.x = window.app.gl.mouse.ex * 0.03;
    this.position.y = window.app.gl.mouse.ey * -0.03 + this.anim.y;
    // this.position.z = window.app.gl.mouse.ey * -0.1;
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
