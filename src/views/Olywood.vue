<template>
  <div class="olywood">
    <h1>Number of movies shot</h1>
  </div>
</template>

<script>
import Bridge from "@/assets/scene/Bridge";
import gsap from "gsap";

export default {
  name: "Olywood",
  mounted() {
    this.bridge = new Bridge();
    this.scene = this.bridge.getSingleton();
    this.scene.createFont();
    this.scene.camera.position.z = 100;
  },
};
</script>

<style lang="scss" scoped>
.olywood {
  position: absolute;
  top: 7vh;
  left: 7vh;
  width: calc(100% - 14vh);
  h1 {
    text-align: center;
  }
}
</style>
