import GUI from "lil-gui";

export class UI extends GUI {
  constructor() {
    super({ closeFolders: true });

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
      particleHigh: 0.9,
    };

    this.particlesFolder = this.addFolder("Particles");
    this.particlesFolder.add(this.particles, "particleLow", 0, 1, 0.001);
    this.particlesFolder.add(this.particles, "particleHigh", 0, 1, 0.001);

    // post
    this.params = {
      bloomStrength: 2.87,
      bloomRadius: 0.181,
      bloomTresh: 0.08,
    };

    this.postFolder = this.addFolder("Post");
    this.postFolder.add(this.params, "bloomStrength", 0, 10, 0.001);
    this.postFolder.add(this.params, "bloomRadius", 0, 2, 0.001);
    this.postFolder.add(this.params, "bloomTresh", 0, 1, 0.001);
  }
}
