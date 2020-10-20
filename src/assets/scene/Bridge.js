import ThreeScene from "./ThreeScene";

class Bridge {
  constructor() {
    this.singleton = ThreeScene;
  }

  getSingleton() {
    return this.singleton;
  }
}
export default Bridge;
