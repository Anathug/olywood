<template>
  <div class="shader-image">
    <h1>test</h1>
  </div>
</template>

<script>
import Bridge from "@/assets/scene/Bridge";

export default {
  name: 'ShaderImage',
  mounted() {
    this.bridge = new Bridge();
    this.scene = this.bridge.getSingleton();
    this.scene.createMesh()
  }
}
</script>

<style scoped lang="scss">

</style>
