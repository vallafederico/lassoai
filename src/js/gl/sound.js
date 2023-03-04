import { Howl, Howler } from "howler";
import { clamp } from "../util/math";

const sound_data = {
  scene1: {
    src: "/sound/scene_1.webm",
    autoplay: false,
    loop: true,
    hasctrl: false,
    volume: 0.5,
  },
  scene2: {
    src: "/sound/scene_3.webm",
    autoplay: false,
    loop: true,
    hasctrl: false,
    volume: 0.5,
  },
  scene3: {
    src: "/sound/scene_4.webm",
    autoplay: false,
    loop: true,
    hasctrl: false,
    volume: 0.5,
  },
  sphere: {
    src: "/sound/sphere_1.webm",
    autoplay: false,
    loop: true,
    hasctrl: false,
    volume: 0.5,
  },
  ui: {
    src: "/sound/ui_click_1.webm",
    autoplay: false,
    loop: false,
    hasctrl: true,
    volume: 0.3,
  },
};

export class Sound {
  constructor() {
    this.toggle = document.querySelector('[data-sound="toggle"]');
    this.isPlaying = false;
    this.hasContext = false;

    this.toggle.onclick = () => this.init();
  }

  init() {
    if (!this.hasContext) {
      // create first time
      this.hasContext = true;
      this.isPlaying = true;
      this.sounds = {};

      this.initDomEvents();

      for (const key in sound_data)
        this.sounds[key] = this.createSound({
          src: sound_data[key].src,
          autoplay: sound_data[key].autoplay,
          loop: sound_data[key].loop,
          hasctrl: sound_data[key].hasctrl,
          volume: sound_data[key].volume,
        });

      this.playPauseMain(true);
    } else {
      if (this.isPlaying) {
        this.isPlaying = false;
        Howler.volume(0.0);

        this.playPauseMain(true);
      } else {
        this.isPlaying = true;
        Howler.volume(0.5);

        this.playPauseMain(false);
      }
    }
  }

  render() {
    if (!this.isPlaying) return;
    if (!this.hasContext) return;

    this.sounds.scene1.volume(rmp(window.UI.state.scenes.get("hero")));
    this.sounds.scene2.volume(rmp(window.UI.state.scenes.get("data")));
    this.sounds.scene3.volume(window.UI.state.scenes.get("foot"));
    this.sounds.sphere.volume(
      clamp(
        0,
        1,
        window.UI.state.scenes.get("data") - window.UI.state.scenes.get("foot")
      )
    );
    // console.log(window.UI.state.scenes); // hero data foot
  }

  playPauseMain(play = true) {
    if (play) {
      this.sounds.scene1.play();
      this.sounds.scene2.play();
      this.sounds.scene3.play();
      this.sounds.sphere.play();
    } else {
      this.sounds.scene1.pause();
      this.sounds.scene2.pause();
      this.sounds.scene3.pause();
      this.sounds.sphere.pause();
    }
  }

  initDomEvents() {
    document.querySelectorAll('[data-sound="ui"]').forEach((el) => {
      el.onmouseenter = () => {
        if (!this.isPlaying && this.sounds.ui.controller) return;
        this.sounds.ui.controller = true;
        this.sounds.ui.play();

        this.sounds.ui.on("end", () => {
          this.sounds.ui.controller = false;
        });
      };
    });
  }

  createSound({ src, autoplay, loop, hasctrl, volume }) {
    const sound = new Howl({
      src: [src],
      autoplay,
      loop,
      volume,
    });

    return sound;
  }
}

function rmp(val, min = 0.2, max = 0.8) {
  return clamp(min, max, Math.sin(val * Math.PI * 2));
}
