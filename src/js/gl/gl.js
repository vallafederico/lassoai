import { WebGLRenderer, sRGBEncoding } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Tween from "gsap";

import Loader from "./util/loader.js";
import Viewport from "./viewport.js";
import SceneHero from "./sceneHero.js";
import SceneData from "./sceneData.js";
import sceneFoot from "./sceneFoot.js";
import Camera from "./camera.js";

import { Post } from "./post.js";

export default class Gl {
  constructor(sel) {
    this.vp = new Viewport();
    this.renderer = new WebGLRenderer({});

    this.renderer.setPixelRatio(this.vp.pixelRatio);
    this.renderer.setSize(this.vp.w, this.vp.h);
    this.renderer.setClearColor(0x121218, 1);
    // this.renderer.outputEncoding = sRGBEncoding;
    this.vp.container.appendChild(this.renderer.domElement);

    this.camera = this.vp.camera = new Camera();

    this.camera.position.set(0, 0, 2);
    // this.controls = new OrbitControls(this.camera, document.body);

    this.paused = false;
    this.time = 0;

    this.initEvents();
    // this.init();
  }

  async init() {
    this.loader = new Loader();
    this.assets = await this.loader.load();

    this.create();
    this.initEvents();

    this.post = new Post({
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera,
    });

    this.render();
  }

  create() {
    this.scene = new SceneHero();
    this.scene1 = new SceneData();
    this.scene2 = new sceneFoot();
  }

  render() {
    if (this.paused) return;
    this.time += 0.0009;

    this.controls?.update();
    requestAnimationFrame(this.render.bind(this));

    this.renderScenes();

    if (this.post?.isOn) {
      this.post.renderPasses(this.time);
      this.post.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  renderScenes() {
    if (this.scene && this.scene.isActive) this.scene.render(this.time);
    if (this.scene1 && this.scene1.isActive) this.scene1.render(this.time);
    if (this.scene2 && this.scene2.isActive) this.scene2.render(this.time);

    this.post.textures = {
      hero: this.scene.toTarget(this.renderer, this.camera),
      data: this.scene1.toTarget(this.renderer, this.camera),
      foot: this.scene2.toTarget(this.renderer, this.camera),
    };

    // console.log(window.UI.state.scenes);
  }

  resize() {
    this.vp.resize();

    this.renderer.setSize(this.vp.w, this.vp.h);
    this.camera.aspect = this.vp.w / this.vp.h;
    this.camera.updateProjectionMatrix();

    if (this.scene) this.scene.resize();
    if (this.scene1) this.scene1.resize();
    if (this.scene2) this.scene2.resize();
    this.post?.resize();
  }

  /* Utils
   */

  get viewSize() {
    const fovInRad = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(
      this.camera.position.z * Math.tan(fovInRad / 2) * 2
    );
    return { w: height * (this.vp.w / this.vp.h), h: height };
  }

  initEvents() {
    new ResizeObserver((entry) => this.resize(entry[0].contentRect)).observe(
      this.vp.container
    );

    this.mouse = { x: 0, y: 0, ex: 0, ey: 0 };
    document.addEventListener("mousemove", (e) => {
      this.mouse.x = (e.clientX / this.vp.w) * 2 - 1;
      this.mouse.y = (e.clientY / this.vp.h) * 2 - 1;
      Tween.to(this.mouse, {
        ex: this.mouse.x,
        ey: this.mouse.y,
        duration: 1.5,
        ease: "slow",
      });
    });
  }

  animateIn(duration = 2.2, delay = 0.2) {
    this.intro = { val: 0 };
    this.post.animateIn({ duration: 0.3 });

    Tween.to(this.intro, {
      val: 1,
      duration,
      delay,
      ease: "circ",
      onUpdate: () => {
        // this.post.animateIn = this.intro.val;
        this.scene.animateIn = this.intro.val;
        this.scene1.animateIn = this.intro.val;
        this.scene2.animateIn = this.intro.val;
      },
    });
  }
}
