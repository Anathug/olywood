<template>
  <div class="home">
    <ShaderImage />
  </div>
</template>

<script>
import ShaderImage from '@/components/ShaderImage.vue'
import Bridge from "@/assets/scene/Bridge";

export default {
  name: 'Home',
  mounted() {
   this.bridge = new Bridge();
    this.scene = this.bridge.getSingleton();
    console.log(this.scene)
    window.addEventListener('click', () => {
        this.scene.slideCamera();
    })
  },
  components: {
    ShaderImage
  },
}
</script>
