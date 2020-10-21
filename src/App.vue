<template>
  <div id="app">
    <CustomCursor />
    <!-- <Loader /> -->
    <PageBG />
    <div class="app__wrapper">
      <NavLayout />
      <transition name="router-anim" mode="out-in">
        <router-view class="router-view" />
      </transition>
    </div>
  </div>
</template>

<script>
import NavLayout from "@/components/NavLayout.vue";
import Loader from "@/components/Loader.vue";
import CustomCursor from "@/components/CustomCursor.vue";
import PageBG from "@/components/PageBG.vue";

export default {
  name: "App",
  components: {
    NavLayout,
    CustomCursor,
    Loader,
    PageBG,
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
  cursor: none;
  a {
    cursor: none;
  }
}

.router-view {
  transition-duration: 1.5s;
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
