import { ASSETS } from "../../assets/";
import loadTexture from "./texture-loader";
import loadModel from "./model-loader";

export default class {
  constructor(data) {
    this.data = data;
  }

  async load() {
    console.time("load");

    console.timeEnd("load");
  }
}
