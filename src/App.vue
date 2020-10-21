<template>
  <div id="app">
    <CustomCursor />
    <div class="app__wrapper">
      <NavLayout />
      <router-view />
    </div>
  </div>
</template>

<script>
import NavLayout from "@/components/NavLayout.vue";
import CustomCursor from "@/components/CustomCursor.vue";

export default {
  name: "App",
  components: {
    NavLayout,
    CustomCursor,
  },
  mounted() {},
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap");
html,
body {
  width: 100vw;
  overflow: hidden;
  position: relative;
  background-color: #161920;
  color: white;
  padding: 0;
  margin: 0;
  font-family: "Lato", sans-serif;
//   cursor: none;
}

canvas {
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
}

.app__wrapper {
  padding: 7vh;
  position: relative;
  z-index: 2;
}
</style>
