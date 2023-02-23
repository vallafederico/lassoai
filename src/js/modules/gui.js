import GUI from "lil-gui";

export class UI extends GUI {
  constructor() {
    super(/*{ closeFolders: true }*/);

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

    // scenes
    this.scenes = {
      scene1: () => {
        window.app.gl.post.mergePass.material.uniforms.scene_switch.value = 0;
      },
      scene2: () => {
        window.app.gl.post.mergePass.material.uniforms.scene_switch.value = 1;
      },
    };

    this.scenesFolder = this.addFolder("Scenes");
    this.scenesFolder.add(this.scenes, "scene1");
    this.scenesFolder.add(this.scenes, "scene2");

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
      bloomStrength: 1.027,
      bloomRadius: 0.181,
      bloomTresh: 0.08,
    };

    this.postFolder = this.addFolder("Post");
    this.postFolder.add(this.params, "bloomStrength", 0, 10, 0.001);
    this.postFolder.add(this.params, "bloomRadius", 0, 2, 0.001);
    this.postFolder.add(this.params, "bloomTresh", 0, 1, 0.001);

    // animation
    this.animation = this.addFolder("Animation");

    this.scene1 = {};
    this.scene1 = this.animation.addFolder("Scene 1");

    this.scene2 = {};
    this.scene2 = this.animation.addFolder("Scene 2");

    // this.scene3 = {};
    // this.scene3 = this.animation.addFolder("Scene 3");
  }
}
