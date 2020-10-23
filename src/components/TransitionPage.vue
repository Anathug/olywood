<template>
  <div class="transition-page"></div>
</template>
<script>
export default {
  name: "TransitionPage",
};
</script>
<style lang="scss" scoped>
.transition-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  transform-origin: right;
  z-index: 3000;
  transform: scaleX(0);
}
</style>
