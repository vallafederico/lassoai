import { Points, BufferAttribute, BufferGeometry } from "three";
import RawInstanceMaterial from "./mat/particle-spiral";

export class SpiralParticles extends Points {
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
    const count = 20000;

    const random = new Float32Array(count);
    const randomColor = new Float32Array(count);
    const position = new Float32Array(count * 3);
    const position2 = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      random.set([Math.random()], i);
      randomColor.set([Math.random()], i);
      position2.set(
        [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1],
        i * 3
      );
    }

    position.set(calcCircles(count, 1));

    this.geometry.setAttribute("a_random", new BufferAttribute(random, 1));
    this.geometry.setAttribute(
      "a_random_color",
      new BufferAttribute(randomColor, 1)
    );
    this.geometry.setAttribute("position", new BufferAttribute(position, 3));
    this.geometry.setAttribute("position2", new BufferAttribute(position2, 3));
  }

  render(t, perc) {
    this.material.time = t;
    this.material.prog = perc;

    // this.rotation.z = t;
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

function computeLogarithmicSpiral(samples = 1000, radius = 0.1) {
  const points = [];

  for (var i = 0; i < samples; i++) {
    const theta = (i / (samples - 1)) * Math.PI * 2;
    const r = radius * Math.log(i + 1);

    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);

    points.push(x, y, 0);
  }

  return points;
}

function calcCircle(pts, radius) {
  const points = [];

  for (var i = 0; i < pts; i++) {
    const x = radius * Math.cos(i);
    const y = radius * Math.sin(i);
    points.push(x, y, 0);
  }

  return points;
}

function calcCircles(pts, radius) {
  const number = 20;
  const perCircle = pts / number;
  const points = [];

  for (var i = 0; i < number; i++) {
    const r = radius * (i / number);
    const circle = calcCircle(perCircle, r);
    points.push(...circle);
  }

  return points;
}
