import { ASSETS } from "../../assets/";
import loadTexture from "./texture-loader";
import loadModel from "./model-loader";

export default class {
  constructor(data) {
    this.data = data;
  }

  async load() {
    console.time("load");
    let [spiral] = await Promise.all([loadModel(ASSETS.spiral)]);

    spiral = spiral.model.children[0].geometry;
    // console.log("spiral", spiral.geometry);

    console.timeEnd("load");

    window.assets = { spiral };
  }
}
