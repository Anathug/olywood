<template>
  <div class="page-bg"></div>
</template>

<script>
import gsap from "gsap";
export default {
  name: "PageBG",
  mounted() {},
};
</script>

<style scoped lang="scss">
.page-bg {
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(#bf6989, #e280a4);
  transform: scaleY(0);
}
</style>
