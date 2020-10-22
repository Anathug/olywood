<template>
  <div
    :style="`background: linear-gradient(${firstColor}, ${secondColor});`"
    class="page-bg"
  ></div>
</template>

<script>
import gsap from "gsap";
export default {
  name: "SectionPageBG",
  props: {
    firstColor: String,
    secondColor: String,
  },
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
  transform: scaleY(0);
  transition: 1s transform cubic-bezier(0.65, 0, 0.35, 1);
  transform-origin: bottom;
}
</style>
