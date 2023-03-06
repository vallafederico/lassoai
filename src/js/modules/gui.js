import GUI from "lil-gui";

export class UI extends GUI {
  constructor() {
    super({ closeFolders: true });

    this.windowGui();
    this.stateMachine();

    this.close();
  }

  stateMachine() {
    this.state = {
      scenes: new Map(),
    };

    this.state.scenes.set("hero", 0);
    this.state.scenes.set("data", 0);
    this.state.scenes.set("foot", 0);
  }

  windowGui() {
    // main
    let domVisibleToggle = true;
    this.ctrls = {
      domVisible: () => {
        const main = document.querySelector("main");

        domVisibleToggle
          ? (domVisibleToggle = false)
          : (domVisibleToggle = true);

        domVisibleToggle
          ? (main.style.visibility = "visible")
          : (main.style.visibility = "hidden");
      },
    };
    this.postFolder = this.addFolder("Main");
    this.postFolder.add(this.ctrls, "domVisible", 0, 10, 0.001);

    // particles
    this.particles = {
      particleLow: 0.1,
      particleHigh: 0.759,
      r: 0.9294117647058824,
      g: 1,
      b: 0,
    };

    this.particlesFolder = this.addFolder("Particles");
    this.particlesFolder.add(
      this.particles,
      "particleLow",
      0,
      1,
      0.0000000000001
    );
    this.particlesFolder.add(
      this.particles,
      "particleHigh",
      0,
      1,
      0.0000000000001
    );

    this.colorFolder = this.particlesFolder.addFolder("Color");
    this.colorFolder.add(this.particles, "r", 0, 1, 0.001);
    this.colorFolder.add(this.particles, "g", 0, 1, 0.001);
    this.colorFolder.add(this.particles, "b", 0, 1, 0.001);

    // post
    this.params = {
      bloomStrength: 1.027,
      bloomRadius: 0.05,
      bloomTresh: 0.08,
    };

    this.postFolder = this.addFolder("Post");
    this.postFolder.add(this.params, "bloomStrength", 0, 10, 0.001);
    this.postFolder.add(this.params, "bloomRadius", 0, 2, 0.001);
    this.postFolder.add(this.params, "bloomTresh", 0, 1, 0.001);
  }
}
