<template>
  <div id="app">
    <CustomCursor />
    <!-- <Loader /> -->
    <TransitionPage />
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
import TransitionPage from "@/components/TransitionPage.vue";
import SmoothScroll from "@/assets/scene/SmoothScroll";

export default {
  name: "App",
  components: {
    NavLayout,
    CustomCursor,
    Loader,
    TransitionPage,
  },
  mounted() {
    new SmoothScroll(document, 60, 20);
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@300;400;700&display=swap");

html,
body {
  position: relative;
  color: black;
  background-color: #e9e9e9;
  padding: 0;
  margin: 0;
  font-family: "Lato", sans-serif;
  cursor: none;
  a {
    cursor: none;
  }
}

h1,
h2,
h3 {
  font-family: "Source Serif Pro", serif;
}

.router-view {
  transition-duration: 1.5s;
}

.overflow-hidden {
  overflow: hidden;
  position: relative;
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

.overflow-hidden {
  position: relative;
  overflow: hidden;
}
</style>
